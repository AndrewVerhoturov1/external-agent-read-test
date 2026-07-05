export const ORDER_LABELS = {
  move: 'двигаться',
  cover: 'занять укрытие',
  suppress: 'подавлять точку',
  face: 'смотреть в сектор'
};

export function makeOrder(type, x, y, speed = 'normal') {
  return {
    type,
    x,
    y,
    speed,
    createdAt: performance.now(),
    label: ORDER_LABELS[type] || type
  };
}

export function orderSpeed(speed) {
  if (speed === 'fast') return 58;
  if (speed === 'cautious') return 26;
  return 40;
}

export function formationOffset(index) {
  const offsets = [
    { x: 0, y: 0 }, { x: -25, y: 22 }, { x: -15, y: 48 },
    { x: 20, y: 42 }, { x: 32, y: 16 }, { x: -35, y: 70 }, { x: 45, y: 68 }, { x: 5, y: 84 }
  ];
  return offsets[index % offsets.length];
}
