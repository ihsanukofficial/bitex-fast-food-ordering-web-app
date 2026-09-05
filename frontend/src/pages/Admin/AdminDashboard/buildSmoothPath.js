/**
 * Monotone cubic (Fritsch-Carlson) Hermite spline, expressed as bezier segments.
 * Unlike a naive Catmull-Rom smoothing, this never overshoots past the value it's
 * connecting — the curve stays visually smooth without implying a high/low that
 * isn't in the data, which matters on a chart people read numbers off of. Shared
 * by the full trend charts and the KPI card sparklines so both render the same
 * curve style at different scales.
 */
function buildSmoothPath(coords) {
  const n = coords.length;
  if (n === 0) return '';
  if (n < 3) {
    return coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(' ');
  }

  const dx = coords[1].x - coords[0].x;
  const slopes = [];
  for (let i = 0; i < n - 1; i += 1) {
    slopes.push((coords[i + 1].y - coords[i].y) / dx);
  }

  const tangents = new Array(n);
  tangents[0] = slopes[0];
  tangents[n - 1] = slopes[n - 2];
  for (let i = 1; i < n - 1; i += 1) {
    tangents[i] = slopes[i - 1] === 0 || slopes[i] === 0 || slopes[i - 1] * slopes[i] < 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2;
  }

  for (let i = 0; i < n - 1; i += 1) {
    if (slopes[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
    } else {
      const alpha = tangents[i] / slopes[i];
      const beta = tangents[i + 1] / slopes[i];
      const magnitude = alpha * alpha + beta * beta;
      if (magnitude > 9) {
        const tau = 3 / Math.sqrt(magnitude);
        tangents[i] = tau * alpha * slopes[i];
        tangents[i + 1] = tau * beta * slopes[i];
      }
    }
  }

  let d = `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const c1x = p0.x + dx / 3;
    const c1y = p0.y + (tangents[i] * dx) / 3;
    const c2x = p1.x - dx / 3;
    const c2y = p1.y - (tangents[i + 1] * dx) / 3;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }
  return d;
}

export default buildSmoothPath;
