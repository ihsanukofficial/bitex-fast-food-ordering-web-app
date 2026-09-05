import Icon from '../../../components/Utils/Icon/Icon';
import { formatCurrency } from './dashboardAnalytics';
import styles from './AdminDashboard.module.css';

/**
 * TopProductsChart
 *
 * Ranked by units sold (the "best seller" the label promises), with revenue shown
 * alongside since the two don't always agree (a cheap side sells more units than an
 * expensive main but earns less). Bar length is a single-hue magnitude encoding —
 * these are ranks of the same measure, not distinct categories, so one hue is right.
 */
function TopProductsChart({ products }) {
  if (products.length === 0) {
    return <div className={styles.chartEmpty}>No product sales yet — top sellers will appear once orders come in.</div>;
  }

  const maxUnits = Math.max(...products.map((product) => product.unitsSold), 1);

  return (
    <ol className={styles.topProductsList}>
      {products.map((product, index) => (
        <li key={product.key} className={styles.topProductRow}>
          <span className={styles.topProductRank}>{index + 1}</span>
          {product.image ? (
            <img className={styles.topProductImage} src={product.image} alt="" />
          ) : (
            <span className={styles.topProductImagePlaceholder} aria-hidden="true">
              <Icon name="ri-restaurant-2-fill" size="1rem" ariaLabel="" />
            </span>
          )}
          <div className={styles.topProductInfo}>
            <p className={styles.topProductTitle}>{product.title}</p>
            <span className={styles.topProductBarTrack}>
              <span
                className={styles.topProductBarFill}
                style={{ width: `${(product.unitsSold / maxUnits) * 100}%` }}
              />
            </span>
          </div>
          <div className={styles.topProductMetrics}>
            <span className={styles.topProductUnits}>{product.unitsSold} sold</span>
            <span className={styles.topProductRevenue}>{formatCurrency(product.revenue)}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default TopProductsChart;
