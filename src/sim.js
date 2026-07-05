import { createTerrain, clampToMap } from './terrain.js';
import { formationOffset, orderSpeed } from './orders.js';
import { angleTo, clamp, distance, moveToward } from './ai.js';

export async function loadScenario(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Не удалось загрузить сценарий: ${response.status}`);
  return response.json();
}

export function createGameState(scenario) {
  const terrain = createTerrain(scenario.map);
  const soldiers = [];
  const squads = [];
  for (const rawSquad of scenario.squads) {
    const squad = {
      id: rawSquad.id,
      name: rawSquad.name,
      side: rawSquad.side,
      leaderId: rawSquad.leaderId,
      soldierIds: [],
      order: null,
      morale: 100,
      suppression: 0,
      cohesion: 100,
      state: 'ожидает приказ',
      lastReason: 'Отделение готово. Выберите приказ и кликните по карте.'
    };
    rawSquad.soldiers.forEach((raw, index) => {
      soldiers.push({
        id: raw.id,
        side: rawSquad.side,
        squadId: rawSquad.id,
        role: raw.role,
        weapon: raw.weapon,
        x: raw.x,
        y: raw.y,
        facing: raw.facing || 0,
        posture: 'standing',
        morale: 100,
        suppression: 0,
        fatigue: 0,
        alive: true,
        targetId: null,
        currentOrder: null,
        lastReason: 'Готов к выполнению приказа.',
        fireCooldown: Math.random() * 0.5,
        index
      });
      squad.soldierIds.push(raw.id);
    });
    squads.push(squad);
  }
  const state = {
    scenario,
    terrain,
    weapons: scenario.weapons,
    soldiers,
    squads,
    selected: { type: 'squad', id: 'blue_squad_1' },
    activeOrder: 'move',
    moveSpeed: 'normal',
    layer: 'normal',
    running: false,
    tick: 0,
    time: 0,
    eventLog: [],
    fireLines: [],
    mouse: { x: 0, y: 0 },
    hoverTerrain: null
  };
  logEvent(state, '00:00 — сценарий загружен: занять дом у лесополосы.', true);
  return state;
}

export function resetGame(state) { return createGameState(state.scenario); }
export function getSoldier(state, id) { return state.soldiers.find(s => s.id === id); }
export function getSquad(state, id) { return state.squads.find(s => s.id === id); }
export function selectedEntity(state) { return state.selected.type === 'soldier' ? getSoldier(state, state.selected.id) : getSquad(state, state.selected.id); }

export function issueOrder(state, squadId, order) {
  const squad = getSquad(state, squadId);
  if (!squad) return;
  squad.order = order;
  squad.state = order.label;
  squad.lastReason = `Получен приказ: ${order.label} к точке ${Math.round(order.x)}, ${Math.round(order.y)}.`;
  for (const id of squad.soldierIds) {
    const soldier = getSoldier(state, id);
    soldier.currentOrder = order;
    soldier.lastReason = `Иду выполнять приказ отделения: ${order.label}.`;
  }
  logEvent(state, `${stamp(state)} — ${squad.name} получило приказ: ${order.label}.`, true);
}

export function updateSimulation(state, dt) {
  state.tick += 1;
  state.time += dt;
  state.fireLines = state.fireLines.filter(line => state.time - line.time < 0.55);
  coolDown(state, dt);
  firePhase(state, dt);
  orderPhase(state, dt);
  squadStats(state);
}

function coolDown(state, dt) {
  for (const s of state.soldiers) {
    if (!s.alive) continue;
    const cover = state.terrain.coverAt(s.x, s.y);
    s.suppression = clamp(s.suppression - (s.posture === 'prone' ? 10 : 7) * (1 + cover * 0.35) * dt, 0, 100);
    s.morale = clamp(s.morale + 1.2 * dt - Math.max(0, s.suppression - 65) * 0.015 * dt, 10, 100);
    s.fatigue = clamp(s.fatigue - 5 * dt, 0, 100);
    if (s.suppression < 35 && s.posture === 'prone' && s.currentOrder) {
      s.posture = s.currentOrder.speed === 'cautious' ? 'cautious' : 'moving';
      s.lastReason = 'Подавление спало, боец снова пытается выполнить приказ.';
    }
  }
}

function firePhase(state, dt) {
  for (const shooter of state.soldiers) {
    if (!shooter.alive) continue;
    shooter.fireCooldown -= dt;
    const weapon = state.weapons[shooter.weapon];
    const target = bestTarget(state, shooter, weapon);
    if (!target) {
      shooter.targetId = null;
      if (shooter.side === 'red') shooter.lastReason = 'Ожидает цель в секторе обстрела.';
      continue;
    }
    shooter.targetId = target.id;
    shooter.facing = angleTo(shooter, target);
    if (shooter.fireCooldown <= 0 && shooter.suppression < 82) {
      applyFirePressure(state, shooter, target, weapon);
      shooter.fireCooldown = Math.max(0.18, 1 / weapon.fireRate);
    }
  }
}

function bestTarget(state, shooter, weapon) {
  return state.soldiers
    .filter(s => s.alive && s.side !== shooter.side)
    .map(t => ({ t, d: distance(shooter, t), v: state.terrain.visibilityBetween(shooter, t) }))
    .filter(x => x.v.visible && x.d <= weapon.range)
    .sort((a, b) => a.d + a.t.suppression * 0.7 - (b.d + b.t.suppression * 0.7))[0]?.t;
}

function applyFirePressure(state, shooter, target, weapon) {
  const dist = distance(shooter, target);
  const cover = state.terrain.coverAt(target.x, target.y);
  const vis = state.terrain.visibilityBetween(shooter, target).quality;
  const rangeMod = clamp(1 - dist / (weapon.range * 1.15), 0.12, 1);
  const gain = weapon.suppressionPower * rangeMod * vis * (1 - cover * 0.65);
  target.suppression = clamp(target.suppression + gain, 0, 100);
  target.morale = clamp(target.morale - gain * 0.08, 0, 100);
  if (target.suppression > 38 && target.posture !== 'prone') {
    target.posture = 'prone';
    target.lastReason = `Рядом прошла очередь: подавление ${Math.round(target.suppression)}, боец залёг.`;
    logEvent(state, `${stamp(state)} — ${shortName(target)} залёг под огнём.`, false);
  }
  if (target.suppression > 74) target.lastReason = `Сильный огонь: suppression ${Math.round(target.suppression)}, боец прижат и почти не двигается.`;
  shooter.lastReason = `${weapon.name}: ведёт огонь по ${shortName(target)}. Дистанция ${Math.round(dist)}.`;
  state.fireLines.push({ from: { x: shooter.x, y: shooter.y }, to: { x: target.x, y: target.y }, side: shooter.side, time: state.time });
}

function orderPhase(state, dt) {
  for (const squad of state.squads.filter(s => s.side === 'blue' && s.order)) {
    const alive = squad.soldierIds.map(id => getSoldier(state, id)).filter(s => s?.alive);
    const avgSupp = alive.reduce((sum, s) => sum + s.suppression, 0) / Math.max(1, alive.length);
    if (avgSupp > 72 || squad.morale < 35) {
      squad.state = 'остановлено огнём';
      squad.lastReason = 'Сильный пулемётный огонь: среднее подавление высокое, приказ временно остановлен.';
    }
    alive.forEach((s, i) => moveSoldierByOrder(state, squad, s, i, dt));
  }
}

function moveSoldierByOrder(state, squad, soldier, index, dt) {
  const order = squad.order;
  if (soldier.suppression > 74) {
    soldier.posture = 'prone';
    soldier.lastReason = 'Прижат огнём: приказ не выполняется, боец лежит и пытается выжить.';
    return tryCover(state, soldier, dt, 16);
  }
  let target = { x: order.x, y: order.y };
  const offset = formationOffset(index);
  if (order.type !== 'cover') target = { x: order.x + offset.x, y: order.y + offset.y };
  if (order.type === 'cover') {
    const c = state.terrain.nearestCover(order.x + offset.x, order.y + offset.y, 130);
    target = c ? { x: c.x, y: c.y } : { x: order.x + offset.x, y: order.y + offset.y };
  }
  target = clampToMap(state.terrain.map, target);
  if (soldier.suppression > 42) {
    soldier.posture = 'prone';
    soldier.lastReason = 'Подавлен: боец залёг, но понемногу смещается к ближайшему укрытию.';
    return tryCover(state, soldier, dt, 24);
  }
  if (order.type === 'face' || order.type === 'suppress') {
    soldier.facing = angleTo(soldier, order);
    soldier.lastReason = order.type === 'face' ? 'Поворачивается в заданный сектор.' : 'Подавляет точку, если видит цель.';
    if (order.type === 'face') return;
  }
  const speed = orderSpeed(order.speed) * (1 - soldier.fatigue / 170) * (1 - soldier.suppression / 180);
  const moved = moveToward(soldier, target, speed * dt);
  if (moved > 0.2) {
    soldier.posture = order.speed === 'cautious' ? 'cautious' : 'moving';
    soldier.fatigue = clamp(soldier.fatigue + (order.speed === 'fast' ? 8 : 3) * dt, 0, 100);
    const zone = state.terrain.topZoneAt(soldier.x, soldier.y);
    soldier.lastReason = `Выполняет приказ: ${order.label}. Местность: ${zone.name}, укрытие ${Math.round(state.terrain.coverAt(soldier.x, soldier.y) * 100)}%.`;
  } else if (distance(soldier, target) < 12) {
    soldier.posture = state.terrain.coverAt(soldier.x, soldier.y) > 0.28 ? 'prone' : 'standing';
    soldier.lastReason = 'Достиг назначенной точки и занимает позицию.';
  }
}

function tryCover(state, soldier, dt, speed) {
  const cover = state.terrain.nearestCover(soldier.x, soldier.y, 95);
  if (!cover || cover.distance < 6) return;
  const before = { x: soldier.x, y: soldier.y };
  moveToward(soldier, cover, speed * dt);
  soldier.lastReason += ` Ближайшее укрытие: ${cover.zone.name}, смещение ${Math.round(distance(before, soldier))} px.`;
}

function squadStats(state) {
  for (const q of state.squads) {
    const members = q.soldierIds.map(id => getSoldier(state, id)).filter(Boolean);
    const alive = members.filter(s => s.alive);
    q.suppression = Math.round(alive.reduce((a, s) => a + s.suppression, 0) / Math.max(1, alive.length));
    q.morale = Math.round(alive.reduce((a, s) => a + s.morale, 0) / Math.max(1, alive.length));
    const c = alive.reduce((a, s) => ({ x: a.x + s.x, y: a.y + s.y }), { x: 0, y: 0 });
    c.x /= Math.max(1, alive.length); c.y /= Math.max(1, alive.length);
    const spread = alive.reduce((a, s) => a + Math.hypot(s.x - c.x, s.y - c.y), 0) / Math.max(1, alive.length);
    q.cohesion = Math.round(clamp(100 - spread * 0.75 - (members.length - alive.length) * 18, 0, 100));
    if (q.side === 'blue' && q.order && q.suppression <= 72) {
      const prone = alive.filter(s => s.posture === 'prone').length;
      q.state = q.order.label;
      q.lastReason = prone ? `${prone} бойцов залегли или используют укрытие; отделение всё ещё пытается выполнить приказ.` : 'Отделение выполняет приказ, подавление пока терпимое.';
    }
  }
}

export function logEvent(state, text, important = false) {
  state.eventLog.unshift({ text, important });
  state.eventLog = state.eventLog.slice(0, 60);
}

export function stamp(state) {
  const seconds = Math.floor(state.time);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function shortName(s) {
  const n = s.id.replace(/[a-z_]/gi, '');
  if (s.side === 'red') return s.role === 'enemy_mg' ? 'вражеский пулемёт' : `враг #${n}`;
  if (s.role === 'squad_leader') return 'командир';
  if (s.role === 'lmg') return 'пулемётчик';
  return `стрелок #${n}`;
}
