import OrderCard from '../OrderCard/OrderCard';
import EmptyState from '../EmptyState/EmptyState';
import styles from './RecentOrders.module.css';

/**
 * RecentOrders
 *
 * The overview's activity snapshot — the latest few orders, with a way straight into
 * the full order history for everything else.
 */
function RecentOrders({ orders, onViewDetails, onViewAll, onBrowseMenu }) {
  const recent = orders.slice(0, 5);

  return (
    <section className={styles.section} aria-labelledby="recent-orders-heading">
      <div className={styles.header}>
        <h2 id="recent-orders-heading" className={styles.heading}>
          Recent Orders
        </h2>
        {orders.length > 0 && (
          <button type="button" className={styles.viewAll} onClick={onViewAll}>
            View All Orders
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <EmptyState
          icon="ri-shopping-bag-3-line"
          title="No orders yet."
          message="Your placed orders will show up here."
          actionLabel="Browse Menu"
          onAction={onBrowseMenu}
        />
      ) : (
        <div className={styles.list}>
          {recent.map((order) => (
            <OrderCard key={order._id} order={order} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentOrders;
