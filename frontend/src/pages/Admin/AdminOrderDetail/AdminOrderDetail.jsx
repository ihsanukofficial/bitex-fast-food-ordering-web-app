import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../services/apiClient';
import { getOrderCode, formatCurrency, formatOrderDateTime } from '../../../utils/orderStatus';
import Icon from '../../../components/Utils/Icon/Icon';
import styles from '../admin.module.css';

const STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

/**
 * AdminOrderDetail
 *
 * The full breakdown of one order — items, totals, customer, and delivery info —
 * reached by clicking a row in AdminOrders. Status stays editable here too, mirroring
 * the list view's own status control.
 */
function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const load = () => apiClient.get(`/orders/${id}`).then((data) => setOrder(data.order));

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (status) => {
    setIsUpdatingStatus(true);
    try {
      await apiClient.patch(`/orders/${id}/status`, { status });
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.linkButton}
        onClick={() => navigate('/admin/orders')}
        style={{ marginBottom: '1.25rem' }}
      >
        <Icon name="ri-arrow-left-s-line" size="1.1rem" ariaLabel="" />
        Back to Orders
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {!order && !error && <p className={styles.cellMuted}>Loading order…</p>}

      {order && (
        <>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderText}>
              <h1 className={styles.panelTitle}>Order {getOrderCode(order._id)}</h1>
              <p className={styles.panelSubtitle}>Placed {formatOrderDateTime(order.createdAt)}</p>
            </div>
            <select
              className={styles.statusSelect}
              data-status={order.status}
              value={order.status}
              disabled={isUpdatingStatus}
              onChange={(event) => handleStatusChange(event.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <span>Customer</span>
              <p className={styles.cellPrimary} style={{ margin: 0 }}>
                {order.user?.name || order.delivery.name}
              </p>
              <p className={styles.cellMuted} style={{ margin: 0 }}>{order.user?.email || '—'}</p>
            </div>
          </div>

          <div className={styles.tableWrap} style={{ marginTop: '1.25rem' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.image ? (
                        <img className={styles.tableImage} src={item.image} alt="" />
                      ) : (
                        <span className={styles.tableImagePlaceholder} aria-hidden="true">
                          <Icon name="ri-restaurant-2-fill" size="1.1rem" ariaLabel="" />
                        </span>
                      )}
                    </td>
                    <td className={styles.cellPrimary}>{item.title}</td>
                    <td className={styles.cellMuted}>{item.quantity}</td>
                    <td className={styles.cellMuted}>{formatCurrency(item.unitPrice)}</td>
                    <td className={styles.cellPrimary}>{formatCurrency(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <span>Subtotal</span>
                <p className={styles.cellPrimary} style={{ margin: 0 }}>{formatCurrency(order.subtotal)}</p>
              </div>
              {order.discount > 0 && (
                <div className={styles.field}>
                  <span>Discount{order.promoCode ? ` (${order.promoCode})` : ''}</span>
                  <p className={styles.cellPrimary} style={{ margin: 0 }}>−{formatCurrency(order.discount)}</p>
                </div>
              )}
              <div className={styles.field}>
                <span>Total</span>
                <p className={styles.cellPrimary} style={{ margin: 0 }}>{formatCurrency(order.total)}</p>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Delivery Information</span>
            <div className={styles.formRow} style={{ marginTop: '0.75rem' }}>
              <div className={styles.field}>
                <span>Name</span>
                <p className={styles.cellPrimary} style={{ margin: 0 }}>{order.delivery.name}</p>
              </div>
              <div className={styles.field}>
                <span>Phone</span>
                <p className={styles.cellPrimary} style={{ margin: 0 }}>{order.delivery.phone}</p>
              </div>
              {order.delivery.email && (
                <div className={styles.field}>
                  <span>Email</span>
                  <p className={styles.cellPrimary} style={{ margin: 0 }}>{order.delivery.email}</p>
                </div>
              )}
              <div className={styles.field}>
                <span>Address</span>
                <p className={styles.cellPrimary} style={{ margin: 0 }}>{order.delivery.address}</p>
              </div>
              {order.delivery.instructions && (
                <div className={styles.field}>
                  <span>Instructions</span>
                  <p className={styles.cellPrimary} style={{ margin: 0 }}>{order.delivery.instructions}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrderDetail;
