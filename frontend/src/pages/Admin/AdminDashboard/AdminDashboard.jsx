import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAdminOrderEvents from '../../../hooks/useAdminOrderEvents';
import { apiClient } from '../../../services/apiClient';
import Icon from '../../../components/Utils/Icon/Icon';
import {
  ORDER_STATUS_LABELS,
  PERIODS,
  attachComparison,
  buildAddonPopularity,
  buildCancellationTrend,
  buildCategoryRevenue,
  buildDeliveredTrend,
  buildLowRatedItems,
  buildOrderCountTrend,
  buildOrderStatusBreakdown,
  buildPeakHeatmap,
  buildPromoCodeEffectiveness,
  buildRevenueTrend,
  buildSignupTrend,
  buildTopProducts,
  buildTopSpenders,
  buildVariationPopularity,
  buildWorstProducts,
  classifyCustomerOrders,
  computeAvgFulfillmentHours,
  computeAvgLifetimeValue,
  computeCancellationStats,
  computeRepeatPurchaseRate,
  downloadCsv,
  filterOrdersByRange,
  formatCount,
  formatCurrency,
  formatDuration,
  formatOrderDate,
  formatPercent,
  formatRelativeDate,
  getInitials,
  getPeriodRange,
  getPreviousPeriodRange,
  percentChange,
  sumRevenue,
  toCsv,
} from './dashboardAnalytics';
import MiniSparkline from './MiniSparkline';
import OrderStatusChart from './OrderStatusChart';
import RevenueTrendChart from './RevenueTrendChart';
import TopProductsChart from './TopProductsChart';
import RankedBarList from './RankedBarList';
import PeakHoursHeatmap from './PeakHoursHeatmap';
import PromoCodeTable from './PromoCodeTable';
import adminStyles from '../admin.module.css';
import styles from './AdminDashboard.module.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
  { id: 'customers', label: 'Customers', icon: 'ri-group-fill' },
  { id: 'products', label: 'Products', icon: 'ri-restaurant-2-fill' },
  { id: 'operations', label: 'Operations', icon: 'ri-equalizer-2-line' },
];

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

/**
 * One KPI card, shared by every tab's stat row — the alert tint and delta/context/
 * sparkline lines are all optional per card, so a card that doesn't set them just
 * renders without that row.
 */
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
    {card.sparkline && <MiniSparkline points={card.sparkline} />}
  </div>
);

/** A small "Export CSV" action for any panel header that lists rows worth saving. */
const ExportButton = ({ onClick }) => (
  <button type="button" className={adminStyles.linkButton} onClick={onClick}>
    <Icon name="ri-file-list-3-line" size="0.85rem" ariaLabel="" />
    Export CSV
  </button>
);

/**
 * AdminDashboard
 *
 * The business-at-a-glance view, organized into four tabs (Overview, Customers,
 * Products, Operations). All figures are aggregated client-side from data the admin
 * panel already fetches elsewhere (/orders, /admin/users, /products, /categories,
 * /deals/flat, /promo-codes) — no new API surface, matching this dashboard's
 * existing architecture. A period filter (including a custom date range) applies
 * across every tab, and any panel that lists rows can export them as CSV.
 */
function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab = tab || 'overview';
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [deals, setDeals] = useState(null);
  const [promoCodes, setPromoCodes] = useState(null);
  const [error, setError] = useState('');

  // Backed by the URL (not local state) so the selected period — including a custom
  // range — survives a refresh instead of always bouncing back to the "30 Days"
  // default, the same way AdminOrders' status tabs already stay put across a reload.
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPeriod = searchParams.get('period') || '30d';
  const period = PERIODS.some((entry) => entry.id === requestedPeriod) ? requestedPeriod : '30d';
  const customStart = searchParams.get('start') || '';
  const customEnd = searchParams.get('end') || '';

  const load = () => {
    setError('');
    return Promise.all([
      apiClient.get('/admin/stats'),
      apiClient.get('/orders'),
      apiClient.get('/admin/users'),
      apiClient.get('/products'),
      apiClient.get('/categories'),
      apiClient.get('/deals/flat'),
      apiClient.get('/promo-codes'),
    ]).then(([statsData, ordersData, usersData, productsData, categoriesData, dealsData, promoCodesData]) => {
      setStats(statsData.stats);
      setOrders(ordersData.orders);
      setUsers(usersData.users);
      setProducts(productsData.products);
      setCategories(categoriesData.categories);
      setDeals(dealsData.deals);
      setPromoCodes(promoCodesData.promoCodes);
    });
  };

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live order activity (new orders, status changes) refreshes the KPIs and charts
  // without the admin needing to reload the page.
  useAdminOrderEvents(() => {
    load().catch((requestError) => setError(requestError.message));
  });

  // Order events alone won't shift the peak-hours heatmap's rolling 7-day window
  // if the tab is left open across midnight with no new activity — this tick forces
  // a re-render each minute so "today" (and thus the last row) never goes stale.
  // Scoped to the Operations tab only (the sole consumer of the heatmap): every other
  // tab's analytics recompute from scratch on every re-render (nothing here is
  // memoized), so ticking unconditionally would burn a full recompute of whichever
  // tab happens to be open, every minute, for a staleness fix it doesn't need.
  const [, forceClockTick] = useState(0);
  useEffect(() => {
    if (activeTab !== 'operations') return undefined;
    const interval = setInterval(() => forceClockTick((tick) => tick + 1), 60000);
    return () => clearInterval(interval);
  }, [activeTab]);

  if (tab && !TABS.some((entry) => entry.id === tab)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handlePeriodClick = (id) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set('period', id);
      if (id === 'custom' && !customStart && !customEnd) {
        const end = new Date();
        const start = new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000);
        next.set('start', start.toISOString().slice(0, 10));
        next.set('end', end.toISOString().slice(0, 10));
      }
      return next;
    });
  };

  const setCustomStart = (value) =>
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set('start', value);
      return next;
    });

  const setCustomEnd = (value) =>
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set('end', value);
      return next;
    });

  const isLoading =
    !error && [stats, orders, users, products, categories, deals, promoCodes].some((value) => value === null);
  const periodMeta = PERIODS.find((entry) => entry.id === period);
  // "over custom" reads oddly in a sentence — every other period name already
  // reads naturally lowercased ("over 30 days", "over this year").
  const periodPhrase = period === 'custom' ? 'the selected date range' : periodMeta.label.toLowerCase();

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
        <div className={`${adminStyles.statGrid} ${styles.statGrid3}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <MetricSkeleton key={index} />
          ))}
        </div>
        <div className={`${adminStyles.panel} ${styles.skeletonCard}`} style={{ marginTop: '1rem', height: '260px' }} />
      </>
    );
  } else {
    const now = new Date();
    const customRange =
      period === 'custom' && customStart && customEnd
        ? { start: new Date(`${customStart}T00:00:00`), end: new Date(`${customEnd}T23:59:59.999`) }
        : null;
    const periodRange = getPeriodRange(period, now, customRange);
    const previousRange = getPreviousPeriodRange(period, now, customRange);
    const periodOrders = filterOrdersByRange(orders, periodRange);
    const previousOrders = filterOrdersByRange(orders, previousRange);

    if (activeTab === 'overview') {
      const periodRevenue = sumRevenue(periodOrders);
      const previousRevenue = sumRevenue(previousOrders);
      const completedOrders = periodOrders.filter((order) => order.status === 'delivered').length;
      const previousCompletedOrders = previousOrders.filter((order) => order.status === 'delivered').length;

      const revenueTrendRaw = buildRevenueTrend(orders, period, now, customRange);
      const revenueTrend = attachComparison(
        revenueTrendRaw,
        orders,
        'createdAt',
        (order) => order.total,
        period,
        now,
        customRange,
        (order) => order.status !== 'cancelled',
      );
      const orderCountTrend = buildOrderCountTrend(orders, period, now, customRange);
      const deliveredTrend = buildDeliveredTrend(orders, period, now, customRange);
      const statusBreakdown = buildOrderStatusBreakdown(periodOrders);
      const topProducts = buildTopProducts(periodOrders, 5);
      const recentOrders = orders.slice(0, 6);
      const recentUsers = users.slice(0, 5);

      const metricCards = [
        {
          key: 'revenue',
          label: 'Total Revenue',
          value: formatCurrency(periodRevenue),
          icon: 'ri-coupon-3-line',
          delta: percentChange(periodRevenue, previousRevenue),
          sparkline: revenueTrend,
        },
        {
          key: 'orders',
          label: 'Total Orders',
          value: periodOrders.length,
          icon: 'ri-shopping-bag-3-line',
          delta: percentChange(periodOrders.length, previousOrders.length),
          sparkline: orderCountTrend,
        },
        {
          key: 'pending',
          label: 'Pending Orders',
          value: stats.pendingOrders,
          icon: 'ri-time-line',
          alert: stats.pendingOrders > 0,
          context: stats.pendingOrders > 0 ? 'Needs attention right now' : 'All caught up',
        },
        {
          key: 'completed',
          label: 'Completed Orders',
          value: completedOrders,
          icon: 'ri-checkbox-circle-fill',
          delta: percentChange(completedOrders, previousCompletedOrders),
          sparkline: deliveredTrend,
        },
        {
          key: 'customers',
          label: 'Total Customers',
          value: stats.users,
          icon: 'ri-group-fill',
          context: 'All time',
        },
        {
          key: 'products',
          label: 'Total Products',
          value: stats.products,
          icon: 'ri-restaurant-2-fill',
          context: 'In catalog',
        },
      ];

      const handleExportOrders = () =>
        downloadCsv(
          `bitex-recent-orders.csv`,
          toCsv(
            orders.map((order) => ({
              id: order._id.slice(-8).toUpperCase(),
              customer: order.user?.name || order.delivery.name,
              items: order.items.reduce((sum, item) => sum + item.quantity, 0),
              total: order.total,
              status: ORDER_STATUS_LABELS[order.status] || order.status,
              placedAt: order.createdAt,
            })),
            [
              ['id', 'Order #'],
              ['customer', 'Customer'],
              ['items', 'Items'],
              ['total', 'Total'],
              ['status', 'Status'],
              ['placedAt', 'Placed At'],
            ],
          ),
        );

      content = (
        <>
          <div className={`${adminStyles.statGrid} ${styles.statGrid3}`}>
            {metricCards.map((card) => (
              <MetricCard key={card.key} card={card} />
            ))}
          </div>

          <div className={`${adminStyles.panel} ${styles.chartPanel}`}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Revenue Overview</h2>
                <p className={adminStyles.panelSubtitle}>Track revenue performance over {periodPhrase}.</p>
              </div>
            </div>
            <RevenueTrendChart points={revenueTrend} periodLabel={periodMeta.label} />
          </div>

          <div className={styles.tripleRow}>
            <div className={adminStyles.panel}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Orders Overview</h2>
                <p className={adminStyles.panelSubtitle}>Status breakdown for {periodPhrase}.</p>
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

            <div className={adminStyles.panel}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Recently Joined</h2>
                <p className={adminStyles.panelSubtitle}>Newest customer accounts.</p>
              </div>
              {recentUsers.length === 0 ? (
                <div className={styles.chartEmpty}>No customers have joined yet.</div>
              ) : (
                <ul className={styles.userList}>
                  {recentUsers.map((recentUser) => (
                    <li key={recentUser._id} className={styles.userRow}>
                      <span className={styles.userAvatar} aria-hidden="true">
                        {getInitials(recentUser.name)}
                      </span>
                      <span className={styles.userInfo}>
                        <span className={styles.userName}>{recentUser.name}</span>
                        <span className={styles.userEmail}>{recentUser.email}</span>
                        <span className={styles.userJoined}>{formatRelativeDate(recentUser.createdAt)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Recent Orders</h2>
                <p className={adminStyles.panelSubtitle}>The latest activity across the store.</p>
              </div>
              <div className={styles.panelExportRow}>
                <ExportButton onClick={handleExportOrders} />
                <Link className={adminStyles.secondaryButton} to="/admin/orders">
                  View all orders
                </Link>
              </div>
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
    } else if (activeTab === 'customers') {
      const customerSplit = classifyCustomerOrders(orders, periodOrders, periodRange);
      const previousSplit = classifyCustomerOrders(orders, previousOrders, previousRange);
      const topSpenders = buildTopSpenders(periodOrders, 8).map((entry) => ({
        ...entry,
        image: null,
        barValue: entry.revenue,
        metricPrimary: formatCurrency(entry.revenue),
        metricSecondary: `${entry.orderCount} order${entry.orderCount === 1 ? '' : 's'}`,
      }));
      const repeatRate = computeRepeatPurchaseRate(orders, periodOrders);
      const avgLifetimeValue = computeAvgLifetimeValue(orders, periodOrders);
      const signupTrend = attachComparison(
        buildSignupTrend(users, period, now, customRange),
        users,
        'createdAt',
        () => 1,
        period,
        now,
        customRange,
      );

      const metricCards = [
        {
          key: 'new-customers',
          label: 'New Customers',
          value: formatCount(customerSplit.newCustomers),
          icon: 'ri-account-circle-line',
          delta: percentChange(customerSplit.newCustomers, previousSplit.newCustomers),
        },
        {
          key: 'returning-customers',
          label: 'Returning Customers',
          value: formatCount(customerSplit.returningCustomers),
          icon: 'ri-history-line',
          delta: percentChange(customerSplit.returningCustomers, previousSplit.returningCustomers),
        },
        {
          key: 'repeat-rate',
          label: 'Repeat Purchase Rate',
          value: formatPercent(repeatRate),
          icon: 'ri-checkbox-circle-fill',
          context: 'Of customers active this period',
        },
        {
          key: 'ltv',
          label: 'Avg. Lifetime Value',
          value: formatCurrency(avgLifetimeValue),
          icon: 'ri-vip-crown-2-fill',
          context: 'Among active customers',
        },
      ];

      const handleExportSpenders = () =>
        downloadCsv(
          `bitex-top-spenders-${period}.csv`,
          toCsv(
            topSpenders.map((entry) => ({ name: entry.title, email: entry.subtitle, orders: entry.orderCount, revenue: entry.revenue })),
            [
              ['name', 'Customer'],
              ['email', 'Email'],
              ['orders', 'Orders'],
              ['revenue', 'Revenue'],
            ],
          ),
        );

      content = (
        <>
          <div className={adminStyles.statGrid}>
            {metricCards.map((card) => (
              <MetricCard key={card.key} card={card} />
            ))}
          </div>

          <div className={`${adminStyles.panel} ${styles.chartPanel}`}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Customer Growth</h2>
              <p className={adminStyles.panelSubtitle}>New signups over {periodPhrase}.</p>
            </div>
            <RevenueTrendChart
              points={signupTrend}
              periodLabel={periodMeta.label}
              seriesLabel="Signups"
              formatAxisValue={formatCount}
              formatTooltipValue={formatCount}
            />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Top Spenders</h2>
                <p className={adminStyles.panelSubtitle}>Highest revenue customers for {periodPhrase}.</p>
              </div>
              <ExportButton onClick={handleExportSpenders} />
            </div>
            <RankedBarList items={topSpenders} icon="ri-account-circle-line" showImages={false} emptyMessage="No customer activity yet for this period." />
          </div>
        </>
      );
    } else if (activeTab === 'products') {
      const topProducts = buildTopProducts(periodOrders, 8).map((entry) => ({
        ...entry,
        barValue: entry.unitsSold,
        metricPrimary: formatCurrency(entry.revenue),
        metricSecondary: `${entry.unitsSold} sold`,
      }));
      const worstProducts = buildWorstProducts(products, periodOrders, 8).map((entry) => ({
        ...entry,
        barValue: Math.max(entry.unitsSold, 0.01),
        metricPrimary: `${entry.unitsSold} sold`,
      }));
      const categoryRevenueRaw = buildCategoryRevenue(products, periodOrders, categories);
      const totalCategoryRevenue = categoryRevenueRaw.reduce((sum, entry) => sum + entry.revenue, 0);
      const categoryRevenue = categoryRevenueRaw.map((entry) => ({
        ...entry,
        image: null,
        barValue: entry.revenue,
        metricPrimary: formatCurrency(entry.revenue),
        metricSecondary: totalCategoryRevenue > 0 ? `${((entry.revenue / totalCategoryRevenue) * 100).toFixed(0)}%` : undefined,
      }));
      const lowRatedItems = buildLowRatedItems(products, deals, 8).map((entry) => ({
        ...entry,
        barValue: Math.max(entry.rating, 0.1),
        metricPrimary: `${entry.rating.toFixed(1)} ★`,
        metricSecondary: `${entry.totalReviews} review${entry.totalReviews === 1 ? '' : 's'}`,
      }));
      const variationPopularity = buildVariationPopularity(periodOrders, 8).map((entry) => ({
        ...entry,
        image: null,
        barValue: entry.count,
        metricPrimary: `${entry.count}×`,
      }));
      const addonPopularity = buildAddonPopularity(periodOrders, 8).map((entry) => ({
        ...entry,
        image: null,
        barValue: entry.count,
        metricPrimary: `${entry.count}×`,
      }));

      const exportRanked = (filename, rows, columns) => () => downloadCsv(filename, toCsv(rows, columns));

      content = (
        <div className={`${styles.tripleRow} ${styles.tripleRow3}`}>
          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Top Sellers</h2>
                <p className={adminStyles.panelSubtitle}>Best sellers for {periodPhrase}.</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-top-sellers-${period}.csv`,
                  topProducts.map((p) => ({ title: p.title, unitsSold: p.unitsSold, revenue: p.revenue })),
                  [['title', 'Product'], ['unitsSold', 'Units Sold'], ['revenue', 'Revenue']],
                )}
              />
            </div>
            <RankedBarList items={topProducts} emptyMessage="No product sales yet for this period." />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Slow Movers</h2>
                <p className={adminStyles.panelSubtitle}>Lowest units sold (available products only).</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-slow-movers-${period}.csv`,
                  worstProducts.map((p) => ({ title: p.title, unitsSold: p.unitsSold })),
                  [['title', 'Product'], ['unitsSold', 'Units Sold']],
                )}
              />
            </div>
            <RankedBarList items={worstProducts} emptyMessage="No products in the catalog yet." />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Revenue by Category</h2>
                <p className={adminStyles.panelSubtitle}>Where {periodPhrase}'s revenue comes from.</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-category-revenue-${period}.csv`,
                  categoryRevenue.map((c) => ({ title: c.title, revenue: c.revenue })),
                  [['title', 'Category'], ['revenue', 'Revenue']],
                )}
              />
            </div>
            <RankedBarList items={categoryRevenue} showImages={false} icon="ri-price-tag-3-line" emptyMessage="No category sales yet for this period." />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Lowest Rated</h2>
                <p className={adminStyles.panelSubtitle}>Products and deals worth a closer look.</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-low-rated.csv`,
                  lowRatedItems.map((i) => ({ title: i.title, type: i.subtitle, rating: i.rating, totalReviews: i.totalReviews })),
                  [['title', 'Item'], ['type', 'Type'], ['rating', 'Rating'], ['totalReviews', 'Reviews']],
                )}
              />
            </div>
            <RankedBarList items={lowRatedItems} icon="ri-star-line" emptyMessage="Nothing has been reviewed yet." />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Popular Variations</h2>
                <p className={adminStyles.panelSubtitle}>Most-chosen size/option combinations.</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-variation-popularity-${period}.csv`,
                  variationPopularity.map((v) => ({ title: v.title, count: v.count })),
                  [['title', 'Variation'], ['count', 'Times Chosen']],
                )}
              />
            </div>
            <RankedBarList items={variationPopularity} showImages={false} icon="ri-equalizer-2-line" emptyMessage="No variations were chosen this period." />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Popular Addons</h2>
                <p className={adminStyles.panelSubtitle}>Most-added extras.</p>
              </div>
              <ExportButton
                onClick={exportRanked(
                  `bitex-addon-popularity-${period}.csv`,
                  addonPopularity.map((a) => ({ title: a.title, count: a.count })),
                  [['title', 'Addon'], ['count', 'Times Added']],
                )}
              />
            </div>
            <RankedBarList items={addonPopularity} showImages={false} icon="ri-add-circle-fill" emptyMessage="No addons were chosen this period." />
          </div>
        </div>
      );
    } else {
      const avgFulfillmentHours = computeAvgFulfillmentHours(periodOrders);
      const cancellationStats = computeCancellationStats(periodOrders);
      const previousCancellationStats = computeCancellationStats(previousOrders);
      // Always the last 7 calendar days (today last) regardless of the period filter
      // above, refreshed live via useAdminOrderEvents + the periodic clock tick.
      const peakHeatmap = buildPeakHeatmap(orders, now);
      const cancellationTrend = attachComparison(
        buildCancellationTrend(orders, period, now, customRange),
        orders,
        'createdAt',
        () => 1,
        period,
        now,
        customRange,
        (order) => order.status === 'cancelled',
      );
      const promoCodeStats = buildPromoCodeEffectiveness(periodOrders, promoCodes);

      let busiestSlot = '—';
      let busiestCount = -1;
      peakHeatmap.grid.forEach((row, day) =>
        row.forEach((count, hour) => {
          if (count > busiestCount) {
            busiestCount = count;
            busiestSlot = `${peakHeatmap.days[day].label}, ${hour}:00`;
          }
        }),
      );

      const metricCards = [
        {
          key: 'fulfillment',
          label: 'Avg. Fulfillment Time',
          value: formatDuration(avgFulfillmentHours),
          icon: 'ri-time-line',
          context: 'Placed to delivered',
        },
        {
          key: 'cancellation-rate',
          label: 'Cancellation Rate',
          value: formatPercent(cancellationStats.rate),
          icon: 'ri-alert-line',
          alert: cancellationStats.rate > 10,
          delta: percentChange(cancellationStats.rate, previousCancellationStats.rate),
          sparkline: cancellationTrend,
        },
        {
          key: 'busiest',
          label: 'Busiest Time',
          value: busiestCount > 0 ? busiestSlot : '—',
          icon: 'ri-fire-fill',
          context: busiestCount > 0 ? `${busiestCount} orders in that hour, last 7 days` : 'No orders yet',
        },
        {
          key: 'promo-uses',
          label: 'Promo Code Uses',
          value: formatCount(promoCodeStats.reduce((sum, entry) => sum + entry.uses, 0)),
          icon: 'ri-coupon-3-line',
          context: `${promoCodeStats.length} code${promoCodeStats.length === 1 ? '' : 's'} used`,
        },
      ];

      const handleExportPromoCodes = () =>
        downloadCsv(
          `bitex-promo-code-effectiveness-${period}.csv`,
          toCsv(promoCodeStats, [
            ['code', 'Code'],
            ['uses', 'Uses'],
            ['discountGiven', 'Discount Given'],
            ['revenue', 'Revenue Influenced'],
          ]),
        );

      content = (
        <>
          <div className={adminStyles.statGrid}>
            {metricCards.map((card) => (
              <MetricCard key={card.key} card={card} />
            ))}
          </div>

          <div className={`${adminStyles.panel} ${styles.chartPanel}`}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Peak Order Times</h2>
              <p className={adminStyles.panelSubtitle}>
                When orders actually come in, by day and hour — last 7 days, live.
              </p>
            </div>
            <PeakHoursHeatmap heatmap={peakHeatmap} />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeaderText}>
              <h2 className={styles.sectionTitle}>Cancellation Trend</h2>
              <p className={adminStyles.panelSubtitle}>Cancelled orders over {periodPhrase}.</p>
            </div>
            <RevenueTrendChart
              points={cancellationTrend}
              periodLabel={periodMeta.label}
              seriesLabel="Cancellations"
              formatAxisValue={formatCount}
              formatTooltipValue={formatCount}
            />
          </div>

          <div className={adminStyles.panel}>
            <div className={adminStyles.panelHeader}>
              <div className={adminStyles.panelHeaderText}>
                <h2 className={styles.sectionTitle}>Promo Code Effectiveness</h2>
                <p className={adminStyles.panelSubtitle}>Codes actually applied this period.</p>
              </div>
              <ExportButton onClick={handleExportPromoCodes} />
            </div>
            <PromoCodeTable codes={promoCodeStats} />
          </div>
        </>
      );
    }
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
            {PERIODS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={entry.id === period ? styles.periodButtonActive : styles.periodButton}
                onClick={() => handlePeriodClick(entry.id)}
                disabled={isLoading || Boolean(error)}
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
      </div>

      <nav className={styles.tabList} aria-label="Dashboard sections">
        {TABS.map((tabItem) => (
          <Link
            key={tabItem.id}
            to={{
              pathname: tabItem.id === 'overview' ? '/admin/dashboard' : `/admin/dashboard/${tabItem.id}`,
              search: searchParams.toString(),
            }}
            className={tabItem.id === activeTab ? styles.tabButtonActive : styles.tabButton}
            aria-current={tabItem.id === activeTab ? 'page' : undefined}
          >
            <Icon name={tabItem.icon} size="0.95rem" ariaLabel="" />
            {tabItem.label}
          </Link>
        ))}
      </nav>

      <div className={styles.tabPanel}>{content}</div>
    </div>
  );
}

export default AdminDashboard;
