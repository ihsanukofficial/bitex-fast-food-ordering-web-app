import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge';
import { formatCurrency, formatOrderDate, getOrderCode, summarizeOrderItems } from '../../../utils/orderStatus';
import styles from './OrderCard.module.css';

/**
 * OrderCard
 *
 * One scannable row for an order — used by both the overview's recent-orders list and
 * the full order history, so the two always look identical.
 */
function OrderCard({ order, onViewDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div className={styles.headerRow}>
          <span className={styles.orderCode}>{getOrderCode(order._id)}</span>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className={styles.date}>{formatOrderDate(order.createdAt)}</p>
        <p className={styles.summary}>{summarizeOrderItems(order.items)}</p>
      </div>

      <div className={styles.aside}>
        <p className={styles.total}>{formatCurrency(order.total)}</p>
        <button type="button" className={styles.viewButton} onClick={() => onViewDetails(order._id)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
