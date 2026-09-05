import { useId, useMemo, useState } from 'react';
import buildSmoothPath from './buildSmoothPath';
import { formatCompactCurrency, formatCurrency } from './dashboardAnalytics';
import styles from './AdminDashboard.module.css';

const WIDTH = 640;
const HEIGHT = 190;
const PADDING_LEFT = 52;
const PADDING_RIGHT = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 26;

/**
 * RevenueTrendChart
 *
 * A line chart (brand red, per the admin's existing accent) with a hover
 * crosshair + tooltip. Built in plain SVG rather than a charting dependency — the
 * data shape (label/value pairs) is small enough that hand-rolled geometry is
 * simpler than wiring up a library for one chart. Despite the name this now backs
 * every trend on the dashboard (revenue, signups, cancellations) —
 * `formatAxisValue`/`formatTooltipValue` default to currency but any bucketed
 * label/value series can supply its own.
 *
 * When a point carries `previousValue`, a second muted/dashed line overlays the
 * immediately-preceding period on the same axis (same measure, same scale — never
 * a second y-axis) with a legend, per the two-series case.
 */
function RevenueTrendChart({
  points,
  periodLabel,
  seriesLabel = 'Revenue',
  formatAxisValue = formatCompactCurrency,
  formatTooltipValue = formatCurrency,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const gradientId = useId();

  const hasData = points.length > 0;
  const total = points.reduce((sum, point) => sum + point.value, 0);
  const hasComparison = points.some((point) => typeof point.previousValue === 'number');

  const geometry = useMemo(() => {
    if (!hasData) return null;

    const maxValue = Math.max(...points.map((point) => point.value), ...points.map((point) => point.previousValue || 0), 1);
    const innerWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT;

    // A tick's own label can't be wider than the space between ticks without
    // colliding with its neighbors — once it's close, tilt every label instead
    // of letting them stack on top of each other.
    const spacePerTick = points.length > 1 ? innerWidth / (points.length - 1) : innerWidth;
    const charWidth = 4.3;
    const maxLabelChars = points.reduce((longest, point) => Math.max(longest, (point.label || '').length), 0);
    const rotateLabels = maxLabelChars * charWidth > spacePerTick;
    // A rotated label reads diagonally rather than straight down, so the room it
    // needs is its own tilted height (~45°, so width * sin(45°)), not a flat guess
    // independent of label length, which either clips long labels or leaves short
    // ones stranded far below the axis.
    const labelRise = maxLabelChars * charWidth * Math.SQRT1_2;
    // Anchored at text-anchor="end", rotate(-45) tilts each label so its anchor —
    // the tick end — sits at the label's own top-right corner and the rest of the
    // text descends down-left from there. So the axis needs only a small fixed
    // clearance before that anchor point, plus labelRise below it for the text
    // itself, rather than clearance-plus-labelRise stacked before the anchor.
    const rotateGap = 12;
    const paddingBottom = rotateLabels ? rotateGap + labelRise + 4 : PADDING_BOTTOM;
    const innerHeight = HEIGHT - PADDING_TOP - paddingBottom;
    const labelY = rotateLabels ? PADDING_TOP + innerHeight + rotateGap : HEIGHT - 6;
    const stepX = points.length > 1 ? innerWidth / (points.length - 1) : 0;
    const xForIndex = (index) => PADDING_LEFT + (points.length > 1 ? index * stepX : innerWidth / 2);
    const yForValue = (value) => PADDING_TOP + innerHeight - (value / maxValue) * innerHeight;

    const coords = points.map((point, index) => ({
      x: xForIndex(index),
      y: yForValue(point.value),
      ...point,
    }));

    const linePath = buildSmoothPath(coords);
    const areaPath = `${linePath} L ${coords.at(-1).x.toFixed(2)} ${PADDING_TOP + innerHeight} L ${coords[0].x.toFixed(2)} ${PADDING_TOP + innerHeight} Z`;

    const previousLinePath = hasComparison
      ? buildSmoothPath(points.map((point, index) => ({ x: xForIndex(index), y: yForValue(point.previousValue || 0) })))
      : null;

    // Small integer series (e.g. a handful of cancellations) can round several of
    // these 5 evenly-spaced fractions to the same displayed label — e.g. maxValue=1
    // rounds 0.5, 0.75 and 1 all down/up to "1". Resolving that by keeping whichever
    // came first (bottom-to-top) stranded the "1" label at the halfway gridline while
    // the actual value-1 point plotted at the top, making the line look like it shot
    // past its own axis. Top and bottom are the true max/min, so they always win a
    // collision; the interior fractions only fill in when they add a new label.
    const seenLabels = new Set();
    const gridLines = [1, 0, 0.75, 0.5, 0.25]
      .map((fraction) => ({
        y: PADDING_TOP + innerHeight * (1 - fraction),
        value: maxValue * fraction,
      }))
      .filter((line) => {
        const label = formatAxisValue(line.value);
        if (seenLabels.has(label)) return false;
        seenLabels.add(label);
        return true;
      });

    return { coords, linePath, areaPath, previousLinePath, gridLines, maxValue, rotateLabels, paddingBottom, labelY };
  }, [points, hasData, hasComparison, formatAxisValue]);

  const handlePointerMove = (event) => {
    if (!geometry) return;
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const pointerX = (event.clientX - rect.left) * scaleX;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    geometry.coords.forEach((coord, index) => {
      const distance = Math.abs(coord.x - pointerX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    setHoverIndex(nearestIndex);
  };

  if (!hasData || total === 0) {
    return (
      <div className={styles.chartEmpty}>
        {seriesLabel} data will appear here once activity comes in for this period.
      </div>
    );
  }

  const hovered = hoverIndex !== null ? geometry.coords[hoverIndex] : null;

  return (
    <div className={styles.chartWrap}>
      {hasComparison && (
        <div className={styles.chartLegend}>
          <span className={styles.chartLegendItem}>
            <span className={styles.chartLegendSwatch} aria-hidden="true" />
            This period
          </span>
          <span className={styles.chartLegendItem}>
            <span className={`${styles.chartLegendSwatch} ${styles.chartLegendSwatchPrevious}`} aria-hidden="true" />
            Previous period
          </span>
        </div>
      )}
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${seriesLabel} trend for ${periodLabel}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--admin-red)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--admin-red)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {geometry.gridLines.map((line) => (
          <g key={line.y}>
            <line
              x1={PADDING_LEFT}
              x2={WIDTH - PADDING_RIGHT}
              y1={line.y}
              y2={line.y}
              className={styles.chartGridline}
            />
            <text x={PADDING_LEFT - 8} y={line.y + 3} className={styles.chartAxisLabel} textAnchor="end">
              {formatAxisValue(line.value)}
            </text>
          </g>
        ))}

        {geometry.coords.map(
          (coord) =>
            coord.label && (
              <line
                key={coord.x}
                x1={coord.x}
                x2={coord.x}
                y1={PADDING_TOP}
                y2={HEIGHT - geometry.paddingBottom}
                className={styles.chartGridline}
              />
            ),
        )}

        <path d={geometry.areaPath} fill={`url(#${gradientId})`} className={styles.chartArea} />
        {geometry.previousLinePath && <path d={geometry.previousLinePath} className={styles.chartLinePrevious} />}
        <path d={geometry.linePath} className={styles.chartLine} />

        {geometry.coords.map(
          (coord, index) =>
            coord.label &&
            (geometry.rotateLabels ? (
              <text
                key={coord.x}
                x={coord.x}
                y={geometry.labelY}
                className={styles.chartAxisLabel}
                textAnchor="end"
                transform={`rotate(-45 ${coord.x.toFixed(2)} ${geometry.labelY.toFixed(2)})`}
              >
                {coord.label}
              </text>
            ) : (
              <text
                key={coord.x}
                x={coord.x}
                y={geometry.labelY}
                className={styles.chartAxisLabel}
                textAnchor={index === 0 ? 'start' : index === geometry.coords.length - 1 ? 'end' : 'middle'}
              >
                {coord.label}
              </text>
            )),
        )}

        {hovered && (
          <>
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={PADDING_TOP}
              y2={HEIGHT - geometry.paddingBottom}
              className={styles.chartCrosshair}
            />
            <circle cx={hovered.x} cy={hovered.y} r="5" className={styles.chartDot} />
          </>
        )}
      </svg>

      {hovered && (
        <div
          className={styles.chartTooltip}
          style={{ left: `${(hovered.x / WIDTH) * 100}%`, top: `${(hovered.y / HEIGHT) * 100}%` }}
        >
          <strong>{formatTooltipValue(hovered.value)}</strong>
          <span>{hovered.label || periodLabel}</span>
          {hasComparison && (
            <span className={styles.chartTooltipPrevious}>Previous: {formatTooltipValue(hovered.previousValue || 0)}</span>
          )}
        </div>
      )}

      {/* Same values, reachable without hovering — for screen readers and keyboard users.
          Explicit roles restore the table semantics CSS display:block (see the stylesheet) removes. */}
      <table className={styles.srOnlyTable} role="table">
        <caption>{seriesLabel} by period for {periodLabel}</caption>
        <tbody role="rowgroup">
          {points.map((point, index) => (
            <tr key={index} role="row">
              <td role="cell">{point.label || `Point ${index + 1}`}</td>
              <td role="cell">{formatTooltipValue(point.value)}</td>
              {hasComparison && <td role="cell">Previous: {formatTooltipValue(point.previousValue || 0)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueTrendChart;
