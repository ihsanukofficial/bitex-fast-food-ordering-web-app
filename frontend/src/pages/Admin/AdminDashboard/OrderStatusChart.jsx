import styles from './AdminDashboard.module.css';

/**
 * Colors read as a pipeline: pending (not started, neutral) -> confirmed/preparing/
 * out_for_delivery (in progress, a light-to-dark sequential ramp so the shade itself
 * signals how far along the order is) -> delivered (good) / cancelled (critical).
 * These are the dataviz skill's status roles, not decoration.
 */
const STATUS_COLOR = {
  pending: '#9a9aa2',
  confirmed: '#86b6ef',
  preparing: '#3987e5',
  out_for_delivery: '#1c5cab',
  delivered: '#0ca30c',
  cancelled: '#d03b3b',
};

/**
 * OrderStatusChart
 *
 * A horizontal bar per status — chosen over a donut because two of the six status
 * labels ("out_for_delivery", "confirmed") are long enough to crowd a pie legend,
 * and a bar makes the counts directly comparable at a glance.
 */
function OrderStatusChart({ breakdown }) {
  const total = breakdown.reduce((sum, entry) => sum + entry.count, 0);
  const maxCount = Math.max(...breakdown.map((entry) => entry.count), 1);

  if (total === 0) {
    return <div className={styles.chartEmpty}>There are no orders to display for this period.</div>;
  }

  return (
    <ul className={styles.statusList}>
      {breakdown.map((entry) => (
        <li key={entry.status} className={styles.statusRow}>
          <span className={styles.statusRowLabel}>{entry.label}</span>
          <span className={styles.statusRowTrack}>
            <span
              className={styles.statusRowFill}
              style={{
                width: `${(entry.count / maxCount) * 100}%`,
                backgroundColor: STATUS_COLOR[entry.status],
              }}
            />
          </span>
          <span className={styles.statusRowCount}>{entry.count}</span>
        </li>
      ))}
    </ul>
  );
}

export default OrderStatusChart;
