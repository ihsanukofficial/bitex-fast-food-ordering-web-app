import { formatCurrency } from './dashboardAnalytics';
import adminStyles from '../admin.module.css';
import styles from './AdminDashboard.module.css';

/**
 * PromoCodeTable
 *
 * A table, not a chart — comparing a handful of named codes across several
 * different measures (uses, discount given, revenue, status) is a lookup job, and
 * a table reads that faster than any chart form would.
 */
function PromoCodeTable({ codes }) {
  if (codes.length === 0) {
    return <div className={styles.chartEmpty}>No promo codes were used during this period.</div>;
  }

  return (
    <div className={adminStyles.tableWrap}>
      <table className={adminStyles.table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Status</th>
            <th>Uses</th>
            <th>Discount given</th>
            <th>Revenue influenced</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((entry) => (
            <tr key={entry.code}>
              <td className={adminStyles.cellPrimary}>{entry.code}</td>
              <td>
                {entry.active === null ? (
                  <span className={adminStyles.badge}>Deleted</span>
                ) : (
                  <span className={adminStyles.badge} data-tone={entry.active ? 'success' : 'danger'}>
                    {entry.active ? 'Active' : 'Inactive'}
                  </span>
                )}
              </td>
              <td className={adminStyles.cellMuted}>{entry.uses}</td>
              <td className={adminStyles.cellMuted}>{formatCurrency(entry.discountGiven)}</td>
              <td className={adminStyles.cellPrimary}>{formatCurrency(entry.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PromoCodeTable;
