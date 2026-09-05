import Icon from '../../Utils/Icon/Icon';
import OrderItemReview from '../OrderItemReview/OrderItemReview';
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge';
import { formatCurrency, formatOrderDateTime, getOrderCode } from '../../../utils/orderStatus';
import styles from './OrderDetails.module.css';

/**
 * OrderDetails
 *
 * Full breakdown of a single order — everything here comes straight from the order
 * document the backend already returns; there's no payment status or delivery-fee
 * field to show because the backend doesn't track either.
 */
function OrderDetails({ order, onBack, onReviewSubmitted, onReviewDeleted }) {
  const isDelivered = order.status === 'delivered';

  return (
    <section className={styles.section} aria-labelledby="order-details-heading">
      <button type="button" className={styles.backLink} onClick={onBack}>
        <Icon name="ri-arrow-left-s-line" size="1.1rem" ariaLabel="" />
        Back to Order History
      </button>

      <div className={styles.header}>
        <div>
          <h2 id="order-details-heading" className={styles.orderCode}>
            Order {getOrderCode(order._id)}
          </h2>
          <p className={styles.date}>{formatOrderDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className={styles.items}>
        {order.items.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.image ? (
              <img className={styles.itemImage} src={item.image} alt="" width="64" height="64" />
            ) : (
              <span className={styles.itemImageFallback} aria-hidden="true">
                <Icon name="ri-restaurant-2-fill" size="1.4rem" ariaLabel="" />
              </span>
            )}
            <div className={styles.itemBody}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemMeta}>
                {item.quantity} × {formatCurrency(item.unitPrice)}
              </p>
              <OrderItemReview
                orderId={order._id}
                itemIndex={index}
                item={item}
                isDelivered={isDelivered}
                onSubmitted={(review) => onReviewSubmitted(index, review)}
                onDeleted={() => onReviewDeleted(index)}
              />
            </div>
            <p className={styles.itemTotal}>{formatCurrency(item.lineTotal)}</p>
          </div>
        ))}
      </div>

      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        {order.discount > 0 && (
          <div className={styles.totalRow}>
            <span>Discount{order.promoCode ? ` (${order.promoCode})` : ''}</span>
            <span className={styles.discount}>−{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className={styles.delivery}>
        <h3 className={styles.deliveryHeading}>Delivery Information</h3>
        <dl className={styles.deliveryList}>
          <div className={styles.deliveryRow}>
            <dt>Name</dt>
            <dd>{order.delivery.name}</dd>
          </div>
          <div className={styles.deliveryRow}>
            <dt>Phone</dt>
            <dd>{order.delivery.phone}</dd>
          </div>
          <div className={styles.deliveryRow}>
            <dt>Address</dt>
            <dd>{order.delivery.address}</dd>
          </div>
          {order.delivery.instructions && (
            <div className={styles.deliveryRow}>
              <dt>Instructions</dt>
              <dd>{order.delivery.instructions}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

export default OrderDetails;
