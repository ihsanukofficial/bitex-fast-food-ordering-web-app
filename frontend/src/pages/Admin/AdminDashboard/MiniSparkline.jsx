import { useId } from 'react';
import buildSmoothPath from './buildSmoothPath';
import styles from './AdminDashboard.module.css';

const WIDTH = 100;
const HEIGHT = 28;
// A touch of vertical breathing room so a smoothed peak/trough doesn't clip
// against the very top/bottom edge of the tiny viewBox.
const INSET = 3;

/**
 * MiniSparkline
 *
 * A decorative-but-real inline trend line for a KPI card — same underlying bucketed
 * series, same smoothed-curve/gradient-fill treatment as the full trend charts, just
 * rendered at a glance with no axes or interaction. Purely a shape-of-the-trend cue,
 * so it's marked aria-hidden; the KPI card's own number and delta already carry the
 * accessible meaning.
 */
function MiniSparkline({ points }) {
  const gradientId = useId();
  if (!points || points.length < 2) return null;

  const values = points.map((point) => point.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX = WIDTH / (values.length - 1);
  const innerHeight = HEIGHT - INSET * 2;

  const coords = values.map((value, index) => ({
    x: index * stepX,
    y: INSET + innerHeight - ((value - min) / range) * innerHeight,
  }));
  const linePath = buildSmoothPath(coords);
  const areaPath = `${linePath} L ${coords.at(-1).x.toFixed(1)} ${HEIGHT} L 0 ${HEIGHT} Z`;

  return (
    <svg className={styles.sparkline} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--admin-red)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--admin-red)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} className={styles.sparklineArea} />
      <path d={linePath} className={styles.sparklineLine} />
    </svg>
  );
}

export default MiniSparkline;
