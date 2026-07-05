export function roleLabel(role) {
  return {
    squad_leader: 'командир отделения',
    rifleman: 'стрелок',
    lmg: 'ручной пулемётчик',
    enemy_mg: 'вражеский пулемёт'
  }[role] || role;
}

export function postureLabel(posture) {
  return {
    standing: 'стоит',
    moving: 'движется',
    prone: 'залёг',
    cautious: 'осторожно двигается',
    dead: 'выведен из строя'
  }[posture] || posture;
}

export function soldierState(s) {
  if (!s.alive) return 'выведен из строя';
  if (s.suppression >= 75) return 'прижат огнём';
  if (s.suppression >= 42) return 'подавлен';
  if (s.posture === 'moving') return 'движется';
  if (s.posture === 'prone') return 'залёг';
  return 'готов';
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function moveToward(unit, target, amount) {
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  const d = Math.hypot(dx, dy);
  if (d < 0.1) return 0;
  const step = Math.min(amount, d);
  unit.x += (dx / d) * step;
  unit.y += (dy / d) * step;
  unit.facing = Math.atan2(dy, dx);
  return step;
}
