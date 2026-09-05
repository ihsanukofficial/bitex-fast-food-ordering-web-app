import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminOrderEvents from '../../../hooks/useAdminOrderEvents';
import { apiClient } from '../../../services/apiClient';
import { getOrderCode } from '../../../utils/orderStatus';
import styles from '../admin.module.css';

const STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
const formatCurrency = (amount) => `Rs. ${Number(amount).toLocaleString('en-PK')}`;

/** AdminOrders — reviews every order and updates its fulfillment status. */
function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    const query = statusFilter ? `?status=${statusFilter}` : '';
    return apiClient.get(`/orders${query}`).then((data) => setOrders(data.orders));
  };

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  // Refetch on every live order broadcast so new orders and status changes made from
  // another tab/admin show up here without a manual reload.
  useAdminOrderEvents(() => {
    load().catch((requestError) => setError(requestError.message));
  });

  const handleStatusChange = async (order, status) => {
    setUpdatingId(order._id);
    try {
      await apiClient.patch(`/orders/${order._id}/status`, { status });
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Orders</h1>
          <p className={styles.panelSubtitle}>{orders.length} orders{statusFilter ? ` · ${statusFilter.replace(/_/g, ' ')}` : ''}</p>
        </div>
        <label className={styles.field} style={{ margin: 0 }}>
          <span>Filter by status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Placed</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className={styles.clickableRow}
                onClick={() => navigate(`/admin/orders/${order._id}`)}
              >
                <td className={styles.cellPrimary}>{getOrderCode(order._id)}</td>
                <td className={styles.cellMuted}>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <span className={styles.cellPrimary}>{order.user?.name || order.delivery.name}</span>
                  <br />
                  <small className={styles.cellMuted}>{order.delivery.phone}</small>
                </td>
                <td className={styles.cellMuted}>{order.items.map((item) => `${item.quantity}× ${item.title}`).join(', ')}</td>
                <td className={styles.cellPrimary}>{formatCurrency(order.total)}</td>
                <td onClick={(event) => event.stopPropagation()}>
                  <select
                    className={styles.statusSelect}
                    data-status={order.status}
                    value={order.status}
                    disabled={updatingId === order._id}
                    onChange={(event) => handleStatusChange(order, event.target.value)}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  No orders match this filter yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
