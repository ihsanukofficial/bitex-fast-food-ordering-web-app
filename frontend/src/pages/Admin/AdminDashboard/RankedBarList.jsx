import Icon from '../../../components/Utils/Icon/Icon';
import styles from './AdminDashboard.module.css';

/**
 * RankedBarList
 *
 * The "ranked list with a proportional bar" pattern used across the dashboard —
 * top spenders, category revenue, low-rated items, variation/addon popularity —
 * generalized from what was originally TopProductsChart's one-off markup. Bar
 * length is always a single-hue magnitude encoding (these are ranks of the same
 * measure, not distinct categories), matching the existing top-sellers chart.
 *
 * Each item: { key, title, subtitle?, image?, barValue, metricPrimary, metricSecondary? }.
 */
function RankedBarList({ items, emptyMessage, icon = 'ri-restaurant-2-fill', showImages = true }) {
  if (items.length === 0) {
    return <div className={styles.chartEmpty}>{emptyMessage}</div>;
  }

  const maxValue = Math.max(...items.map((item) => item.barValue), 1);

  const rowClassName = showImages ? styles.topProductRow : `${styles.topProductRow} ${styles.topProductRowNoImage}`;

  return (
    <ol className={styles.topProductsList}>
      {items.map((item, index) => (
        <li key={item.key} className={rowClassName}>
          <span className={styles.topProductRank}>{index + 1}</span>
          {showImages &&
            (item.image ? (
              <img className={styles.topProductImage} src={item.image} alt="" />
            ) : (
              <span className={styles.topProductImagePlaceholder} aria-hidden="true">
                <Icon name={icon} size="1rem" ariaLabel="" />
              </span>
            ))}
          <div className={styles.topProductInfo}>
            <p className={styles.topProductTitle} title={item.subtitle ? `${item.title} · ${item.subtitle}` : item.title}>
              {item.title}
              {item.subtitle && <span className={styles.topProductSubtitle}> · {item.subtitle}</span>}
            </p>
            <span className={styles.topProductBarTrack}>
              <span className={styles.topProductBarFill} style={{ width: `${(item.barValue / maxValue) * 100}%` }} />
            </span>
          </div>
          <div className={styles.topProductMetrics}>
            {item.metricSecondary && <span className={styles.topProductUnits}>{item.metricSecondary}</span>}
            <span className={styles.topProductRevenue}>{item.metricPrimary}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default RankedBarList;
