import { roleLabel, postureLabel, soldierState } from './ai.js';
import { getSoldier, selectedEntity } from './sim.js';

export function updateUi(state) {
  updateDetails(state);
  updateEvents(state);
  document.getElementById('tickInfo').textContent = `tick ${state.tick} / ${state.running ? 'идёт' : 'пауза'}`;
  document.getElementById('mouseInfo').textContent = `x: ${Math.round(state.mouse.x)}, y: ${Math.round(state.mouse.y)}${state.hoverTerrain ? ` / ${state.hoverTerrain.name}` : ''}`;
  const selected = selectedEntity(state);
  document.getElementById('selectedInfo').textContent = selected ? `выбрано: ${selected.name || selected.id}` : 'выбрано: нет';
}

function updateDetails(state) {
  const details = document.getElementById('details');
  const explain = document.getElementById('explain');
  const entity = selectedEntity(state);
  if (!entity) {
    details.textContent = 'Ничего не выбрано.';
    explain.textContent = 'Кликните по отделению или бойцу.';
    return;
  }
  if (state.selected.type === 'soldier') {
    const s = entity;
    const cover = state.terrain.coverAt(s.x, s.y);
    const zone = state.terrain.topZoneAt(s.x, s.y);
    const visibleEnemies = state.soldiers.filter(e => e.alive && e.side !== s.side && state.terrain.visibilityBetween(s, e).visible).length;
    details.textContent = [
      `Роль: ${roleLabel(s.role)}`,
      `Оружие: ${state.weapons[s.weapon].name}`,
      `Поза: ${postureLabel(s.posture)}`,
      `Состояние: ${soldierState(s)}`,
      `Подавление: ${Math.round(s.suppression)}`,
      `Мораль: ${Math.round(s.morale)}`,
      `Усталость: ${Math.round(s.fatigue)}`,
      `Укрытие: ${zone.name}, ${Math.round(cover * 100)}%`,
      `Видит врагов: ${visibleEnemies}`
    ].join('\n');
    explain.textContent = s.lastReason;
    return;
  }
  const q = entity;
  const members = q.soldierIds.map(id => getSoldier(state, id)).filter(Boolean);
  const active = members.filter(s => s.alive).length;
  const prone = members.filter(s => s.alive && s.posture === 'prone').length;
  const suppressed = members.filter(s => s.alive && s.suppression >= 42).length;
  details.textContent = [
    `Название: ${q.name}`,
    `Приказ: ${q.order ? q.order.label : 'нет'}`,
    `Состояние: ${q.state}`,
    `Мораль: ${q.morale}`,
    `Подавление: ${q.suppression}`,
    `Целостность: ${q.cohesion}`,
    `В строю: ${active}/${members.length}`,
    `Залегли: ${prone}`,
    `Подавлены: ${suppressed}`
  ].join('\n');
  explain.textContent = q.lastReason;
}

function updateEvents(state) {
  const log = document.getElementById('eventLog');
  log.textContent = state.eventLog.map(e => e.text).join('\n');
}
