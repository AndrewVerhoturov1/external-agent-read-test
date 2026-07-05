import { soldierState } from './ai.js';

const COLORS = {
  field: '#768a49', forest: '#335a34', road: '#8b7c61', building: '#6f6254',
  trench: '#4a3a2a', hill: '#9a934f', ravine: '#556b55', wall: '#8a8a7a'
};

export function render(state, canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, state);
  drawObjectives(ctx, state);
  drawLayer(ctx, state);
  drawOrders(ctx, state);
  drawFireLines(ctx, state);
  drawSoldiers(ctx, state);
  drawSelection(ctx, state);
}

function drawMap(ctx, state) {
  ctx.fillStyle = COLORS.field;
  ctx.fillRect(0, 0, state.terrain.map.width, state.terrain.map.height);
  for (const z of state.terrain.zones) {
    if (z.type === 'field') continue;
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = COLORS[z.type] || '#777';
    ctx.strokeStyle = 'rgba(20,25,18,.65)';
    ctx.lineWidth = z.type === 'trench' ? 10 : 2;
    if (z.points) drawPolyline(ctx, z.points);
    else if (z.type === 'hill' || z.type === 'ravine') { rounded(ctx, z.x, z.y, z.w, z.h, 45); ctx.fill(); ctx.stroke(); drawContour(ctx, z); }
    else { ctx.fillRect(z.x, z.y, z.w, z.h); ctx.strokeRect(z.x, z.y, z.w, z.h); }
    if (z.type === 'forest') drawForest(ctx, z);
    if (z.type === 'building') { ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(z.x + 8, z.y + 8, z.w - 16, z.h - 16); }
    ctx.restore();
  }
}

function drawObjectives(ctx, state) {
  for (const obj of state.scenario.map.objectives || []) {
    ctx.save(); ctx.setLineDash([8, 6]); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '14px sans-serif'; ctx.fillText(obj.name, obj.x - 44, obj.y - obj.radius - 8); ctx.restore();
  }
}

function drawLayer(ctx, state) {
  if (state.layer === 'cover') drawCoverLayer(ctx, state);
  if (state.layer === 'height') drawHeightLayer(ctx, state);
  if (state.layer === 'visibility') drawVisibilityLayer(ctx, state);
  if (state.layer === 'fire') drawFireDanger(ctx, state);
  if (state.layer === 'suppression') drawSuppressionLayer(ctx, state);
}

function drawCoverLayer(ctx, state) {
  for (const z of state.terrain.zones) {
    const cover = z.cover || 0;
    if (!cover) continue;
    ctx.save(); ctx.globalAlpha = 0.25 + cover * 0.55; ctx.fillStyle = cover > 0.65 ? '#2e6b37' : cover > 0.35 ? '#75a45a' : '#d7c56b'; fillZone(ctx, z); ctx.restore();
  }
}

function drawHeightLayer(ctx, state) {
  const step = 50;
  for (let x = 0; x < state.terrain.map.width; x += step) for (let y = 0; y < state.terrain.map.height; y += step) {
    const h = state.terrain.heightAt(x + step / 2, y + step / 2);
    ctx.fillStyle = h >= 16 ? 'rgba(240,211,100,.26)' : h <= 7 ? 'rgba(70,110,155,.25)' : 'rgba(255,255,255,.04)';
    ctx.fillRect(x, y, step, step);
  }
  for (const z of state.terrain.zones.filter(z => z.type === 'hill' || z.type === 'ravine')) drawContour(ctx, z, true);
}

function drawVisibilityLayer(ctx, state) {
  const selected = selectedSoldier(state);
  if (!selected) return;
  ctx.save(); ctx.fillStyle = 'rgba(210,230,255,.08)'; ctx.strokeStyle = 'rgba(210,230,255,.30)';
  ctx.beginPath(); ctx.arc(selected.x, selected.y, 420, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  for (const e of state.soldiers.filter(s => s.alive && s.side !== selected.side)) {
    const vis = state.terrain.visibilityBetween(selected, e);
    ctx.strokeStyle = vis.visible ? 'rgba(120,220,120,.75)' : 'rgba(255,80,80,.3)';
    ctx.beginPath(); ctx.moveTo(selected.x, selected.y); ctx.lineTo(e.x, e.y); ctx.stroke();
  }
  ctx.restore();
}

function drawFireDanger(ctx, state) {
  for (const mg of state.soldiers.filter(s => s.alive && (s.weapon === 'enemy_mg' || s.weapon === 'lmg'))) {
    ctx.save(); ctx.translate(mg.x, mg.y); ctx.rotate(mg.facing); ctx.fillStyle = mg.side === 'red' ? 'rgba(255,65,65,.15)' : 'rgba(90,160,255,.12)';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, mg.side === 'red' ? 610 : 460, -0.45, 0.45); ctx.closePath(); ctx.fill(); ctx.restore();
  }
}

function drawSuppressionLayer(ctx, state) {
  for (const s of state.soldiers.filter(s => s.alive && s.suppression >= 10)) {
    ctx.save(); ctx.globalAlpha = 0.15 + s.suppression / 140; ctx.fillStyle = s.suppression > 70 ? '#ff3939' : '#ffd166';
    ctx.beginPath(); ctx.arc(s.x, s.y, 18 + s.suppression * 0.23, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
}

function drawOrders(ctx, state) {
  for (const q of state.squads.filter(s => s.side === 'blue' && s.order)) {
    const alive = q.soldierIds.map(id => state.soldiers.find(s => s.id === id)).filter(Boolean).filter(s => s.alive);
    const c = centerOf(alive);
    ctx.save(); ctx.strokeStyle = '#f3f0a0'; ctx.fillStyle = '#f3f0a0'; ctx.lineWidth = 3; ctx.setLineDash([10, 6]);
    ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(q.order.x, q.order.y); ctx.stroke(); ctx.setLineDash([]);
    arrowHead(ctx, c, q.order); ctx.beginPath(); ctx.arc(q.order.x, q.order.y, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.font = '13px sans-serif'; ctx.fillText(q.order.label, q.order.x + 14, q.order.y - 10); ctx.restore();
  }
}

function drawFireLines(ctx, state) {
  for (const line of state.fireLines) {
    ctx.save(); ctx.globalAlpha = Math.max(0, 1 - (state.time - line.time) / 0.55); ctx.strokeStyle = line.side === 'red' ? '#ff6b5f' : '#58a6ff'; ctx.lineWidth = line.side === 'red' ? 2.2 : 1.6;
    ctx.beginPath(); ctx.moveTo(line.from.x, line.from.y); ctx.lineTo(line.to.x, line.to.y); ctx.stroke(); ctx.restore();
  }
}

function drawSoldiers(ctx, state) {
  for (const s of state.soldiers) {
    ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.facing);
    if (!s.alive) { ctx.strokeStyle = '#111'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-8,-8); ctx.lineTo(8,8); ctx.moveTo(8,-8); ctx.lineTo(-8,8); ctx.stroke(); ctx.restore(); continue; }
    ctx.fillStyle = s.side === 'blue' ? '#58a6ff' : '#ff6b5f'; ctx.strokeStyle = '#101410'; ctx.lineWidth = 2;
    ctx.beginPath();
    if (s.posture === 'prone') ctx.ellipse(0, 0, 12, 6, 0, 0, Math.PI * 2); else ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#111'; ctx.lineWidth = s.weapon.includes('mg') || s.weapon === 'lmg' ? 4 : 2.5; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(s.weapon.includes('mg') || s.weapon === 'lmg' ? 25 : 19, 0); ctx.stroke();
    ctx.restore();
    if (s.role === 'squad_leader') { ctx.save(); ctx.fillStyle = '#fff7a3'; triangle(ctx, s.x, s.y - 18, 7); ctx.restore(); }
    if (s.weapon.includes('mg') || s.weapon === 'lmg') { ctx.save(); ctx.strokeStyle = '#101410'; ctx.strokeRect(s.x - 6, s.y + 11, 12, 6); ctx.restore(); }
    if (s.suppression >= 38) { ctx.save(); ctx.strokeStyle = s.suppression >= 72 ? '#ff3333' : '#ffd166'; ctx.lineWidth = s.suppression >= 72 ? 4 : 3; ctx.beginPath(); ctx.arc(s.x, s.y, 15, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    if (state.terrain.coverAt(s.x, s.y) >= 0.3) { ctx.save(); ctx.fillStyle = '#dceec7'; ctx.fillRect(s.x + 10, s.y - 13, 8, 10); ctx.restore(); }
  }
}

function drawSelection(ctx, state) {
  const selected = state.selected.type === 'soldier' ? [state.soldiers.find(s => s.id === state.selected.id)] : state.squads.find(q => q.id === state.selected.id)?.soldierIds.map(id => state.soldiers.find(s => s.id === id));
  if (!selected) return;
  ctx.save(); ctx.strokeStyle = '#fff'; ctx.setLineDash([5,4]);
  for (const s of selected.filter(Boolean)) { ctx.beginPath(); ctx.arc(s.x, s.y, 20, 0, Math.PI * 2); ctx.stroke(); }
  ctx.restore();
}

function selectedSoldier(state) {
  if (state.selected.type === 'soldier') return state.soldiers.find(s => s.id === state.selected.id);
  const q = state.squads.find(q => q.id === state.selected.id);
  return state.soldiers.find(s => s.id === q?.leaderId);
}
function fillZone(ctx, z) { if (z.points) { ctx.lineWidth = Math.max(12, (z.radius || 16) * 2); ctx.strokeStyle = ctx.fillStyle; drawPolyline(ctx, z.points); } else ctx.fillRect(z.x, z.y, z.w, z.h); }
function drawPolyline(ctx, points) { ctx.beginPath(); points.forEach((p,i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.lineCap = 'round'; ctx.stroke(); }
function drawForest(ctx, z) { ctx.fillStyle = 'rgba(12,35,15,.35)'; for (let x = z.x + 15; x < z.x + z.w; x += 34) for (let y = z.y + 18; y < z.y + z.h; y += 42) { ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill(); } }
function drawContour(ctx, z, labels = false) { ctx.save(); ctx.strokeStyle = z.type === 'ravine' ? 'rgba(150,210,255,.45)' : 'rgba(255,255,210,.45)'; for (let i=0;i<4;i++){ const p=18+i*18; rounded(ctx,z.x+p,z.y+p,z.w-p*2,z.h-p*2,32); ctx.stroke(); } if(labels){ ctx.fillStyle='#f3f0a0'; ctx.font='13px sans-serif'; ctx.fillText(`h ${z.height}`, z.x+8, z.y+18);} ctx.restore(); }
function rounded(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); }
function triangle(ctx,x,y,size){ ctx.beginPath(); ctx.moveTo(x,y-size); ctx.lineTo(x-size,y+size); ctx.lineTo(x+size,y+size); ctx.closePath(); ctx.fill(); }
function arrowHead(ctx, from, to) { const a = Math.atan2(to.y - from.y, to.x - from.x); ctx.beginPath(); ctx.moveTo(to.x,to.y); ctx.lineTo(to.x-13*Math.cos(a-.45),to.y-13*Math.sin(a-.45)); ctx.lineTo(to.x-13*Math.cos(a+.45),to.y-13*Math.sin(a+.45)); ctx.closePath(); ctx.fill(); }
function centerOf(items) { const c = items.reduce((a, s) => ({ x: a.x + s.x, y: a.y + s.y }), { x: 0, y: 0 }); return { x: c.x / Math.max(1, items.length), y: c.y / Math.max(1, items.length) }; }
