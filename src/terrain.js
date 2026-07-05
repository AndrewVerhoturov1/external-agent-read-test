export function createTerrain(map) {
  const zones = map.terrain || [];
  const base = zones.find(z => z.type === 'field') || { name: 'местность', cover: 0, height: 10 };

  function contains(zone, x, y) {
    if (zone.points) return distanceToPolyline(zone.points, x, y) <= (zone.radius || 16);
    return x >= zone.x && y >= zone.y && x <= zone.x + zone.w && y <= zone.y + zone.h;
  }

  function zonesAt(x, y) {
    return zones.filter(z => contains(z, x, y));
  }

  function topZoneAt(x, y) {
    const found = zonesAt(x, y);
    if (!found.length) return base;
    return found[found.length - 1];
  }

  function coverAt(x, y) {
    const found = zonesAt(x, y);
    return found.reduce((best, zone) => Math.max(best, Number(zone.cover || 0)), 0);
  }

  function heightAt(x, y) {
    const found = zonesAt(x, y);
    if (!found.length) return base.height || 10;
    return Math.max(...found.map(z => Number(z.height ?? 10)));
  }

  function blocksLine(a, b) {
    for (const zone of zones) {
      if (!zone.blocksLos) continue;
      if (lineIntersectsRect(a.x, a.y, b.x, b.y, zone.x, zone.y, zone.w, zone.h)) return true;
    }
    return false;
  }

  function visibilityBetween(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 620) return { visible: false, quality: 0, reason: 'цель слишком далеко' };
    if (blocksLine(a, b)) return { visible: false, quality: 0, reason: 'здание перекрывает линию видимости' };

    let quality = 1;
    const steps = Math.max(8, Math.floor(distance / 35));
    for (let i = 1; i < steps; i += 1) {
      const x = a.x + dx * (i / steps);
      const y = a.y + dy * (i / steps);
      const zone = topZoneAt(x, y);
      if (zone.type === 'forest') quality *= 0.88;
      if (zone.type === 'hill') {
        const middleHeight = heightAt(x, y);
        if (middleHeight > Math.max(heightAt(a.x, a.y), heightAt(b.x, b.y)) + 4) quality *= 0.55;
      }
    }
    if (b.posture === 'prone') quality *= 0.72;
    quality *= 1 - Math.min(0.55, coverAt(b.x, b.y) * 0.55);
    return { visible: quality > 0.22, quality, reason: quality > 0.22 ? 'цель видна' : 'цель плохо различима в укрытии' };
  }

  function nearestCover(x, y, radius = 85) {
    let best = null;
    for (const zone of zones) {
      if ((zone.cover || 0) < 0.3) continue;
      const point = nearestPointOnZone(zone, x, y);
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance <= radius && (!best || distance < best.distance)) {
        best = { ...point, distance, zone };
      }
    }
    return best;
  }

  return { map, zones, contains, zonesAt, topZoneAt, coverAt, heightAt, blocksLine, visibilityBetween, nearestCover };
}

export function clampToMap(map, p) {
  return {
    x: Math.max(10, Math.min(map.width - 10, p.x)),
    y: Math.max(10, Math.min(map.height - 10, p.y))
  };
}

export function distanceToPolyline(points, x, y) {
  let best = Infinity;
  for (let i = 0; i < points.length - 1; i += 1) {
    best = Math.min(best, distancePointToSegment(x, y, points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]));
  }
  return best;
}

function nearestPointOnZone(zone, x, y) {
  if (zone.points) {
    let best = { x: zone.points[0][0], y: zone.points[0][1], distance: Infinity };
    for (let i = 0; i < zone.points.length - 1; i += 1) {
      const p = nearestPointOnSegment(x, y, zone.points[i][0], zone.points[i][1], zone.points[i + 1][0], zone.points[i + 1][1]);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < best.distance) best = { ...p, distance: d };
    }
    return best;
  }
  return {
    x: Math.max(zone.x, Math.min(zone.x + zone.w, x)),
    y: Math.max(zone.y, Math.min(zone.y + zone.h, y))
  };
}

function distancePointToSegment(px, py, x1, y1, x2, y2) {
  const p = nearestPointOnSegment(px, py, x1, y1, x2, y2);
  return Math.hypot(px - p.x, py - p.y);
}

function nearestPointOnSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / length2));
  return { x: x1 + t * dx, y: y1 + t * dy };
}

function lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
  if (pointInRect(x1, y1, rx, ry, rw, rh) || pointInRect(x2, y2, rx, ry, rw, rh)) return true;
  return lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry) ||
    lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh) ||
    lineLine(x1, y1, x2, y2, rx + rw, ry + rh, rx, ry + rh) ||
    lineLine(x1, y1, x2, y2, rx, ry + rh, rx, ry);
}

function pointInRect(x, y, rx, ry, rw, rh) {
  return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (den === 0) return false;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}
