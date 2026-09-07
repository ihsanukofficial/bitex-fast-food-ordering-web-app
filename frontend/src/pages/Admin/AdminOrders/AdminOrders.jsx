import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAdminOrderEvents from '../../../hooks/useAdminOrderEvents';
import { apiClient } from '../../../services/apiClient';
import { getOrderCode } from '../../../utils/orderStatus';
import Icon from '../../../components/Utils/Icon/Icon';
import { PERIODS, filterOrdersByRange, getPeriodRange } from '../AdminDashboard/dashboardAnalytics';
import styles from '../admin.module.css';

const STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
// One icon per tab (see the shared .tabList/.tabButton styles in admin.module.css,
// the same pattern AdminDashboard's own section tabs use) — '' is the "All" tab.
const STATUS_ICONS = {
  '': 'ri-shopping-bag-3-line',
  pending: 'ri-time-line',
  confirmed: 'ri-check-line',
  preparing: 'ri-fire-line',
  out_for_delivery: 'ri-map-pin-line',
  delivered: 'ri-checkbox-circle-fill',
  cancelled: 'ri-close-line',
};
// AdminDashboard's own PERIODS has no "all time" option — it's an analytics report,
// always summarizing *some* window. This is a search/browse tool instead, where
// defaulting to a 30-day window would just hide an older order the admin is looking
// for, so "All Time" is prepended and is this page's own default.
const ORDER_PERIODS = [{ id: 'all', label: 'All Time' }, ...PERIODS];
const formatCurrency = (amount) => `Rs. ${Number(amount).toLocaleString('en-PK')}`;

/**
 * AdminOrders — reviews every order and updates its fulfillment status. Three filters
 * combine: status as tabs (matching AdminDashboard's own section tabs, backed by the
 * URL's `status` query param so a filtered view is bookmarkable), a search box
 * (order #, customer name/email/phone, item names, promo code), and a date-range
 * picker using the exact same period/custom-range control as the analytics dashboard.
 * Status is filtered server-side (each tab refetches from the API); search and the
 * date range narrow further, client-side, from whatever that fetch already returned.
 */
function AdminOrders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedStatus = searchParams.get('status') || '';
  // Falls back to "All" for a stale/hand-edited URL naming a status that no longer
  // exists, rather than silently sending it to the API as an unrecognized filter.
  const statusFilter = STATUSES.includes(requestedStatus) ? requestedStatus : '';
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

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

  const handlePeriodClick = (id) => {
    setPeriod(id);
    if (id === 'custom' && !customStart && !customEnd) {
      const end = new Date();
      const start = new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000);
      setCustomStart(start.toISOString().slice(0, 10));
      setCustomEnd(end.toISOString().slice(0, 10));
    }
  };

  const filteredOrders = useMemo(() => {
    const ordersInRange =
      period === 'all'
        ? orders
        : filterOrdersByRange(
            orders,
            getPeriodRange(
              period,
              new Date(),
              period === 'custom' && customStart && customEnd
                ? { start: new Date(`${customStart}T00:00:00`), end: new Date(`${customEnd}T23:59:59.999`) }
                : null,
            ),
          );

    const query = search.trim().toLowerCase();
    if (!query) return ordersInRange;

    return ordersInRange.filter((order) => {
      const haystack = [
        getOrderCode(order._id),
        order.user?.name,
        order.user?.email,
        order.delivery?.name,
        order.delivery?.phone,
        order.delivery?.email,
        order.promoCode,
        ...order.items.map((item) => item.title),
      ];
      return haystack.some((value) => value && String(value).toLowerCase().includes(query));
    });
  }, [orders, search, period, customStart, customEnd]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Orders</h1>
          <p className={styles.panelSubtitle}>
            {filteredOrders.length} orders{statusFilter ? ` · ${statusFilter.replace(/_/g, ' ')}` : ''}
          </p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchField}>
          <Icon name="ri-search-line" size="1rem" ariaLabel="" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search by order #, name, email, phone, item, or promo code…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.periodFilter} role="group" aria-label="Time period">
          {ORDER_PERIODS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={entry.id === period ? styles.periodButtonActive : styles.periodButton}
              onClick={() => handlePeriodClick(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        {period === 'custom' && (
          <div className={styles.customRangeRow}>
            <input
              type="date"
              value={customStart}
              max={customEnd || undefined}
              onChange={(event) => setCustomStart(event.target.value)}
              aria-label="Custom range start date"
            />
            <span className={styles.customRangeSeparator}>to</span>
            <input
              type="date"
              value={customEnd}
              min={customStart || undefined}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setCustomEnd(event.target.value)}
              aria-label="Custom range end date"
            />
          </div>
        )}
      </div>

      <nav className={styles.tabList} aria-label="Filter orders by status">
        <Link
          to="/admin/orders"
          className={!statusFilter ? styles.tabButtonActive : styles.tabButton}
          aria-current={!statusFilter ? 'page' : undefined}
        >
          <Icon name={STATUS_ICONS['']} size="0.95rem" ariaLabel="" />
          All
        </Link>
        {STATUSES.map((status) => (
          <Link
            key={status}
            to={`/admin/orders?status=${status}`}
            className={status === statusFilter ? styles.tabButtonActive : styles.tabButton}
            aria-current={status === statusFilter ? 'page' : undefined}
          >
            <Icon name={STATUS_ICONS[status]} size="0.95rem" ariaLabel="" />
            {status.replace(/_/g, ' ')}
          </Link>
        ))}
      </nav>

      <div className={styles.tabPanel}>
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
              {filteredOrders.map((order) => (
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
              {filteredOrders.length === 0 && (
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
    </div>
  );
}

export default AdminOrders;
