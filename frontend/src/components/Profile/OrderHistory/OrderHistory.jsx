import { useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import EmptyState from '../EmptyState/EmptyState';
import styles from './OrderHistory.module.css';

const PAGE_SIZE = 8;

/**
 * OrderHistory
 *
 * The complete order list. The backend returns every order in one response (no
 * server-side paging), so "Load More" simply reveals more of the already-fetched,
 * newest-first list rather than making another request.
 */
function OrderHistory({ orders, onViewDetails, onBrowseMenu }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (orders.length === 0) {
    return (
      <section className={styles.section} aria-labelledby="order-history-heading">
        <h2 id="order-history-heading" className={styles.heading}>
          Order History
        </h2>
        <EmptyState
          icon="ri-shopping-bag-3-line"
          title="No orders yet."
          message="When you place an order, it will show up here."
          actionLabel="Browse Menu"
          onAction={onBrowseMenu}
        />
      </section>
    );
  }

  const visibleOrders = orders.slice(0, visibleCount);

  return (
    <section className={styles.section} aria-labelledby="order-history-heading">
      <div className={styles.header}>
        <h2 id="order-history-heading" className={styles.heading}>
          Order History
        </h2>
        <span className={styles.count}>{orders.length} order{orders.length === 1 ? '' : 's'}</span>
      </div>

      <div className={styles.list}>
        {visibleOrders.map((order) => (
          <OrderCard key={order._id} order={order} onViewDetails={onViewDetails} />
        ))}
      </div>

      {visibleCount < orders.length && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
        >
          Load More Orders
        </button>
      )}
    </section>
  );
}

export default OrderHistory;
