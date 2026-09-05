import { getOrderStatusLabel } from '../../../utils/orderStatus';
import styles from './OrderStatusBadge.module.css';

/**
 * OrderStatusBadge
 *
 * Renders an order's status as a compact, color-coded pill shared by every profile
 * surface that lists orders, so a status reads identically everywhere it appears.
 */
function OrderStatusBadge({ status }) {
  return (
    <span className={styles.badge} data-status={status}>
      {getOrderStatusLabel(status)}
    </span>
  );
}

export default OrderStatusBadge;
