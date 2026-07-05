import { makeOrder } from './orders.js';
import { getSquad, issueOrder, selectedEntity } from './sim.js';

export function attachInput(stateRef, canvas, callbacks) {
  const runPause = document.getElementById('runPause');
  runPause.addEventListener('click', () => {
    const state = stateRef.current;
    state.running = !state.running;
    runPause.textContent = state.running ? 'Пауза' : 'Пуск';
  });
  document.getElementById('stepBtn').addEventListener('click', () => callbacks.step());
  document.getElementById('resetBtn').addEventListener('click', () => {
    stateRef.current = callbacks.reset();
    runPause.textContent = 'Пуск';
    callbacks.afterReset();
  });

  document.querySelectorAll('[data-order]').forEach(button => {
    button.addEventListener('click', () => {
      stateRef.current.activeOrder = button.dataset.order;
      markActive('[data-order]', button);
    });
  });
  document.querySelectorAll('[data-speed]').forEach(button => {
    button.addEventListener('click', () => {
      stateRef.current.moveSpeed = button.dataset.speed;
      markActive('[data-speed]', button);
    });
  });
  document.querySelectorAll('[data-layer]').forEach(button => {
    button.addEventListener('click', () => {
      stateRef.current.layer = button.dataset.layer;
      markActive('[data-layer]', button);
    });
  });

  canvas.addEventListener('mousemove', event => {
    const p = canvasPoint(canvas, event);
    stateRef.current.mouse = p;
    stateRef.current.hoverTerrain = stateRef.current.terrain.topZoneAt(p.x, p.y);
  });

  canvas.addEventListener('click', event => {
    const state = stateRef.current;
    const p = canvasPoint(canvas, event);
    const hit = pickSoldier(state, p.x, p.y);
    if (hit) {
      state.selected = { type: 'soldier', id: hit.id };
      return;
    }
    const selected = selectedEntity(state);
    const squad = state.selected.type === 'squad' ? selected : getSquad(state, selected ? selected.squadId : 'blue_squad_1');
    if (squad && squad.side === 'blue') {
      state.selected = { type: 'squad', id: squad.id };
      issueOrder(state, squad.id, makeOrder(state.activeOrder, p.x, p.y, state.moveSpeed));
    }
  });
}

function canvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function pickSoldier(state, x, y) {
  let best = null;
  for (const s of state.soldiers) {
    const d = Math.hypot(s.x - x, s.y - y);
    if (d < 18 && (!best || d < best.distance)) best = { id: s.id, distance: d };
  }
  return best;
}

function markActive(selector, active) {
  document.querySelectorAll(selector).forEach(button => button.classList.toggle('active', button === active));
}
