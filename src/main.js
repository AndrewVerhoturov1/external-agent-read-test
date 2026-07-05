import { attachInput } from './input.js';
import { render } from './render.js';
import { createGameState, loadScenario, resetGame, updateSimulation } from './sim.js';
import { updateUi } from './ui.js';

const canvas = document.getElementById('gameCanvas');
const stateRef = { current: null };
let last = performance.now();
let accumulator = 0;
const fixedDt = 1 / 20;

const scenario = await loadScenario('./data/scenario_01.json');
stateRef.current = createGameState(scenario);
attachInput(stateRef, canvas, {
  step: () => {
    updateSimulation(stateRef.current, fixedDt);
    draw();
  },
  reset: () => resetGame(stateRef.current),
  afterReset: () => draw()
});
requestAnimationFrame(loop);

function loop(now) {
  const state = stateRef.current;
  const dt = Math.min(0.08, (now - last) / 1000);
  last = now;
  if (state.running) {
    accumulator += dt;
    while (accumulator >= fixedDt) {
      updateSimulation(state, fixedDt);
      accumulator -= fixedDt;
    }
  }
  draw();
  requestAnimationFrame(loop);
}

function draw() {
  render(stateRef.current, canvas);
  updateUi(stateRef.current);
}
