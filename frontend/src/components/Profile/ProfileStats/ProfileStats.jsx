import Icon from '../../Utils/Icon/Icon';
import { formatCurrency } from '../../../utils/orderStatus';
import styles from './ProfileStats.module.css';

/**
 * ProfileStats
 *
 * The four numbers a returning customer cares about most, all derived from their own
 * order history — no figure appears here that the backend doesn't actually provide.
 */
function ProfileStats({ stats }) {
  const cards = [
    { key: 'totalOrders', label: 'Total Orders', value: stats.totalOrders, icon: 'ri-shopping-bag-3-line' },
    {
      key: 'completedOrders',
      label: 'Completed Orders',
      value: stats.completedOrders,
      icon: 'ri-checkbox-circle-fill',
    },
    { key: 'totalReviews', label: 'Total Reviews', value: stats.totalReviews, icon: 'ri-star-fill' },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      icon: 'ri-coupon-3-line',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.key} className={styles.card}>
          <span className={styles.icon} aria-hidden="true">
            <Icon name={card.icon} size="1.15rem" ariaLabel="" />
          </span>
          <p className={styles.value}>{card.value}</p>
          <p className={styles.label}>{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;
