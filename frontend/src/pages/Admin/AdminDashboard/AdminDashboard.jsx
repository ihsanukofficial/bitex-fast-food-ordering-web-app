import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAdminOrderEvents from '../../../hooks/useAdminOrderEvents';
import { apiClient } from '../../../services/apiClient';
import Icon from '../../../components/Utils/Icon/Icon';
import {
  ORDER_STATUS_LABELS,
  PERIODS,
  attachComparison,
  buildOrderStatusBreakdown,
  buildRevenueTrend,
  buildTopProducts,
  filterOrdersByRange,
  formatCurrency,
  formatOrderDate,
  getPeriodRange,
  getPreviousPeriodRange,
  percentChange,
  sumRevenue,
} from './dashboardAnalytics';
import OrderStatusChart from './OrderStatusChart';
import RevenueTrendChart from './RevenueTrendChart';
import TopProductsChart from './TopProductsChart';
import adminStyles from '../admin.module.css';
import styles from './AdminDashboard.module.css';

// The dashboard stays basic: fixed presets only (no custom date range).
const DASHBOARD_PERIODS = PERIODS.filter((entry) => entry.id !== 'custom');

const Delta = ({ value }) => {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <p className={`${styles.metricDelta} ${isUp ? styles.metricDeltaUp : styles.metricDeltaDown}`}>
      <span className={isUp ? styles.deltaIconUp : styles.deltaIconDown} aria-hidden="true">
        <Icon name="ri-arrow-right-line" size="0.85rem" ariaLabel="" />
      </span>
      {isUp ? '+' : ''}
      {value.toFixed(1)}%<span className={styles.metricDeltaContext}> vs previous period</span>
    </p>
  );
};

const MetricSkeleton = () => (
  <div className={`${adminStyles.statCard} ${styles.skeletonCard}`}>
    <div className={styles.skeletonLine} style={{ width: '60%' }} />
    <div className={styles.skeletonLine} style={{ width: '40%', height: '1.8rem' }} />
  </div>
);

const MetricCard = ({ card }) => (
  <div className={`${adminStyles.statCard} ${card.alert ? styles.metricCardAlert : ''}`}>
    <div className={adminStyles.statCardHeader}>
      <p className={adminStyles.statLabel}>{card.label}</p>
      <span className={adminStyles.statIcon} aria-hidden="true">
        <Icon name={card.icon} size="1.1rem" ariaLabel="" />
      </span>
    </div>
    <p className={adminStyles.statValue}>{card.value}</p>
    <Delta value={card.delta} />
    {card.context && <p className={styles.metricContext}>{card.context}</p>}
  </div>
);

/**
 * AdminDashboard
 *
 * A basic, single-page snapshot of the business: four headline numbers, revenue
 * over time, order status, best sellers and the latest orders. Everything is
 * aggregated client-side from /admin/stats and /orders for the selected period.
 */
function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  // Backed by the URL so the selected period survives a refresh.
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPeriod = searchParams.get('period');
  const period = DASHBOARD_PERIODS.some((entry) => entry.id === requestedPeriod) ? requestedPeriod : '30d';

  const load = () => {
    setError('');
    return Promise.all([apiClient.get('/admin/stats'), apiClient.get('/orders')]).then(
      ([statsData, ordersData]) => {
        setStats(statsData.stats);
        setOrders(ordersData.orders);
      },
    );
  };

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live order activity refreshes the numbers without a manual reload.
  useAdminOrderEvents(() => {
    load().catch((requestError) => setError(requestError.message));
  });

  const isLoading = !error && (stats === null || orders === null);
  const periodMeta = DASHBOARD_PERIODS.find((entry) => entry.id === period);
  const periodPhrase = periodMeta.label.toLowerCase();

  let content = null;

  if (error) {
    content = (
      <div className={adminStyles.panel}>
        <p className={adminStyles.error}>Unable to load dashboard data. {error}</p>
        <button
          type="button"
          className={adminStyles.button}
          onClick={() => load().catch((requestError) => setError(requestError.message))}
        >
          Try again
        </button>
      </div>
    );
  } else if (isLoading) {
    content = (
      <>
        <div className={adminStyles.statGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <MetricSkeleton key={index} />
          ))}
        </div>
        <div className={`${adminStyles.panel} ${styles.skeletonCard}`} style={{ marginTop: '1rem', height: '260px' }} />
      </>
    );
  } else {
    const now = new Date();
    const periodOrders = filterOrdersByRange(orders, getPeriodRange(period, now));
    const previousOrders = filterOrdersByRange(orders, getPreviousPeriodRange(period, now));
    const countable = (list) => list.filter((order) => order.status !== 'cancelled').length;

    const periodRevenue = sumRevenue(periodOrders);
    const previousRevenue = sumRevenue(previousOrders);
    const averageOrderValue = countable(periodOrders) ? periodRevenue / countable(periodOrders) : 0;
    const previousAverage = countable(previousOrders) ? previousRevenue / countable(previousOrders) : 0;

    const revenueTrend = attachComparison(
      buildRevenueTrend(orders, period, now),
      orders,
      'createdAt',
      (order) => order.total,
      period,
      now,
      null,
      (order) => order.status !== 'cancelled',
    );
    const statusBreakdown = buildOrderStatusBreakdown(periodOrders);
    const topProducts = buildTopProducts(periodOrders, 5);
    const recentOrders = orders.slice(0, 6);

    const metricCards = [
      {
        key: 'revenue',
        label: 'Revenue',
        value: formatCurrency(periodRevenue),
        icon: 'ri-coupon-3-line',
        delta: percentChange(periodRevenue, previousRevenue),
      },
      {
        key: 'orders',
        label: 'Orders',
        value: periodOrders.length,
        icon: 'ri-shopping-bag-3-line',
        delta: percentChange(periodOrders.length, previousOrders.length),
      },
      {
        key: 'average',
        label: 'Average Order Value',
        value: formatCurrency(averageOrderValue),
        icon: 'ri-price-tag-3-line',
        delta: percentChange(averageOrderValue, previousAverage),
      },
      {
        key: 'pending',
        label: 'Pending Orders',
        value: stats.pendingOrders,
        icon: 'ri-time-line',
        alert: stats.pendingOrders > 0,
        context: stats.pendingOrders > 0 ? 'Needs attention right now' : 'All caught up',
      },
    ];

    content = (
      <>
        <div className={adminStyles.statGrid}>
          {metricCards.map((card) => (
            <MetricCard key={card.key} card={card} />
          ))}
        </div>

        <div className={`${adminStyles.panel} ${styles.chartPanel}`}>
          <div className={adminStyles.panelHeaderText}>
            <h2 className={styles.sectionTitle}>Revenue</h2>
            <p className={adminStyles.panelSubtitle}>Revenue over {periodPhrase}, excluding cancelled orders.</p>
          </div>
          <RevenueTrendChart points={revenueTrend} periodLabel={periodMeta.label} />
        </div>

        <div className={styles.tripleRow}>
          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Order Status</h2>
              <p className={adminStyles.panelSubtitle}>Where orders stand for {periodPhrase}.</p>
            </div>
            <OrderStatusChart breakdown={statusBreakdown} />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Top Products</h2>
              <p className={adminStyles.panelSubtitle}>Best sellers for {periodPhrase}.</p>
            </div>
            <TopProductsChart products={topProducts} />
          </div>
        </div>

        <div className={adminStyles.panel}>
          <div className={adminStyles.panelHeader}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Recent Orders</h2>
              <p className={adminStyles.panelSubtitle}>The latest activity across the store.</p>
            </div>
            <Link className={adminStyles.secondaryButton} to="/admin/orders">
              View all orders
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className={styles.chartEmpty}>There are no orders to display.</div>
          ) : (
            <div className={adminStyles.tableWrap}>
              <table className={adminStyles.table}>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Placed</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className={adminStyles.clickableRow}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <td className={adminStyles.cellPrimary}>#{order._id.slice(-8).toUpperCase()}</td>
                      <td className={adminStyles.cellMuted}>{order.user?.name || order.delivery.name}</td>
                      <td className={adminStyles.cellMuted}>
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </td>
                      <td className={adminStyles.cellPrimary}>{formatCurrency(order.total)}</td>
                      <td>
                        <span
                          className={adminStyles.statusSelect}
                          data-status={order.status}
                          style={{ cursor: 'default' }}
                        >
                          {ORDER_STATUS_LABELS[order.status] || order.status}
                        </span>
                      </td>
                      <td className={adminStyles.cellMuted}>{formatOrderDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <p className={styles.headerSubtitle}>Welcome back, {user?.name?.split(' ')[0] || 'Admin'}.</p>
        </div>
        <div className={styles.controlsRow}>
          <div className={styles.periodFilter} role="group" aria-label="Time period">
            {DASHBOARD_PERIODS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={entry.id === period ? styles.periodButtonActive : styles.periodButton}
                onClick={() => setSearchParams({ period: entry.id })}
                disabled={isLoading || Boolean(error)}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.tabPanel}>{content}</div>
    </div>
  );
}

export default AdminDashboard;
