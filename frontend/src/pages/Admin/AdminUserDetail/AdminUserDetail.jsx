import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../services/apiClient';
import { getOrderCode, formatCurrency } from '../../../utils/orderStatus';
import AdminUserAvatar from '../../../components/Admin/AdminUserAvatar/AdminUserAvatar';
import Icon from '../../../components/Utils/Icon/Icon';
import styles from '../admin.module.css';

/**
 * AdminUserDetail
 *
 * One account's full profile plus its order history — reached by clicking a row in
 * AdminUsers. Role/status stay editable here too, mirroring the list view's controls.
 */
function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationError, setNotificationError] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);

  const load = () =>
    Promise.all([
      apiClient.get(`/admin/users/${id}`).then((data) => setUser(data.user)),
      apiClient.get(`/orders?user=${id}`).then((data) => setOrders(data.orders)),
    ]);

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isSelf = user?._id === currentUser?.id;

  const handleSendNotification = async (event) => {
    event.preventDefault();
    setNotificationError('');
    setNotificationSent(false);

    if (!notificationMessage.trim()) {
      setNotificationError('Enter a message to send.');
      return;
    }

    setIsSendingNotification(true);
    try {
      await apiClient.post(`/admin/users/${id}/notifications`, { message: notificationMessage.trim() });
      setNotificationMessage('');
      setNotificationSent(true);
    } catch (requestError) {
      setNotificationError(requestError.message);
    } finally {
      setIsSendingNotification(false);
    }
  };

  const handleUpdate = async (changes) => {
    setIsUpdating(true);
    setError('');
    try {
      await apiClient.put(`/admin/users/${id}`, changes);
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.linkButton}
        onClick={() => navigate('/admin/users')}
        style={{ marginBottom: '1.25rem' }}
      >
        <Icon name="ri-arrow-left-s-line" size="1.1rem" ariaLabel="" />
        Back to Users
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {!user && !error && <p className={styles.cellMuted}>Loading user…</p>}

      {user && (
        <>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderText} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.85rem' }}>
              <AdminUserAvatar name={user.name} avatar={user.avatar} />
              <div>
                <h1 className={styles.panelTitle}>
                  {user.name}
                  {isSelf && <small className={styles.cellMuted}> (you)</small>}
                </h1>
                <p className={styles.panelSubtitle}>{user.email}</p>
              </div>
            </div>
            <div className={styles.actions}>
              <span className={styles.badge} data-tone={user.role === 'admin' ? 'accent' : undefined}>
                {user.role}
              </span>
              <span className={styles.badge} data-tone={user.active ? 'success' : 'danger'}>
                {user.active ? 'active' : 'deactivated'}
              </span>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <span>Phone</span>
              <p className={styles.cellPrimary} style={{ margin: 0 }}>{user.phone || '—'}</p>
            </div>
            <div className={styles.field}>
              <span>Address</span>
              <p className={styles.cellPrimary} style={{ margin: 0 }}>{user.address || '—'}</p>
            </div>
            <div className={styles.field}>
              <span>Joined</span>
              <p className={styles.cellPrimary} style={{ margin: 0 }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.actions}>
              <button
                className={styles.linkButton}
                type="button"
                disabled={isSelf || isUpdating}
                onClick={() => handleUpdate({ role: user.role === 'admin' ? 'user' : 'admin' })}
              >
                {user.role === 'admin' ? 'Revoke admin' : 'Make admin'}
              </button>
              <button
                className={styles.dangerButton}
                type="button"
                disabled={isSelf || isUpdating}
                onClick={() => handleUpdate({ active: !user.active })}
              >
                {user.active ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Send Notification</span>
            <p className={styles.fieldGroupHint}>
              Delivered instantly to {user.name}&rsquo;s notification bell.
            </p>
            <form onSubmit={handleSendNotification} style={{ marginTop: '0.75rem' }}>
              {notificationSent && <p className={styles.success}>Notification sent to {user.name}.</p>}
              {notificationError && <p className={styles.error}>{notificationError}</p>}
              <label className={styles.field}>
                <span>Message</span>
                <textarea
                  rows={3}
                  maxLength={500}
                  placeholder="Write a message for this user…"
                  value={notificationMessage}
                  onChange={(event) => {
                    setNotificationMessage(event.target.value);
                    setNotificationSent(false);
                  }}
                />
              </label>
              <div className={styles.actions} style={{ marginTop: '0.75rem' }}>
                <button type="submit" className={styles.button} disabled={isSendingNotification}>
                  {isSendingNotification ? 'Sending…' : 'Send Notification'}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Order History</span>
            <div className={styles.tableWrap} style={{ marginTop: '0.75rem' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Placed</th>
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
                      <td className={styles.cellMuted}>
                        {order.items.map((item) => `${item.quantity}× ${item.title}`).join(', ')}
                      </td>
                      <td className={styles.cellPrimary}>{formatCurrency(order.total)}</td>
                      <td>
                        <span className={styles.statusSelect} data-status={order.status}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className={styles.emptyState}>
                        This account has no orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminUserDetail;
