import { Fragment, useState } from 'react';
import { DAY_NAMES } from './dashboardAnalytics';
import styles from './AdminDashboard.module.css';

/**
 * PeakHoursHeatmap
 *
 * Order volume by day-of-week x hour-of-day. A sequential encoding is the right
 * choice for a single magnitude (order count) — one hue (the admin's brand red),
 * light to dark, rather than a categorical palette. Implemented as opacity steps
 * over the same red used everywhere else on the dashboard, so it reads as "more of
 * the same thing" rather than a new, unrelated color scale.
 */
function PeakHoursHeatmap({ grid }) {
  const [hoverCell, setHoverCell] = useState(null);

  const maxCount = Math.max(...grid.flat(), 1);
  const total = grid.flat().reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return <div className={styles.chartEmpty}>No orders yet — the peak-hours pattern will appear once activity comes in.</div>;
  }

  const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21];

  return (
    <div className={styles.heatmapWrap}>
      <div className={styles.heatmapGrid}>
        <div className={styles.heatmapCornerCell} aria-hidden="true" />
        {Array.from({ length: 24 }, (_, hour) => (
          <div key={hour} className={styles.heatmapHourLabel}>
            {hourLabels.includes(hour) ? `${hour}:00` : ''}
          </div>
        ))}

        {DAY_NAMES.map((dayName, dayIndex) => (
          <Fragment key={dayName}>
            <div className={styles.heatmapDayLabel}>{dayName}</div>
            {Array.from({ length: 24 }, (_, hour) => {
              const count = grid[dayIndex][hour];
              const isHovered = hoverCell?.day === dayIndex && hoverCell?.hour === hour;
              return (
                <div
                  key={`${dayName}-${hour}`}
                  className={styles.heatmapCell}
                  style={{ opacity: count === 0 ? 0.06 : 0.12 + (count / maxCount) * 0.88 }}
                  onPointerEnter={() => setHoverCell({ day: dayIndex, hour, count })}
                  onPointerLeave={() => setHoverCell(null)}
                  role="img"
                  aria-label={`${dayName} ${hour}:00, ${count} order${count === 1 ? '' : 's'}`}
                >
                  {isHovered && (
                    <div className={styles.heatmapTooltip}>
                      <strong>{count} order{count === 1 ? '' : 's'}</strong>
                      <span>
                        {dayName}, {hour}:00
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      <div className={styles.heatmapLegend}>
        <span>Fewer orders</span>
        <span className={styles.heatmapLegendSwatches} aria-hidden="true" />
        <span>More orders</span>
      </div>

      {/* Same values, reachable without hovering — for screen readers and keyboard users.
          Explicit roles restore the table semantics CSS display:block (see the stylesheet) removes. */}
      <table className={styles.srOnlyTable} role="table">
        <caption>Order counts by day of week and hour</caption>
        <tbody role="rowgroup">
          {DAY_NAMES.map((dayName, dayIndex) => (
            <tr key={dayName} role="row">
              <th scope="row" role="rowheader">
                {dayName}
              </th>
              {grid[dayIndex].map((count, hour) => (
                <td key={hour} role="cell">
                  {hour}:00 — {count}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeakHoursHeatmap;
