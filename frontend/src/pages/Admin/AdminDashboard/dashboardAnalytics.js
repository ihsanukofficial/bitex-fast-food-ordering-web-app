/**
 * Pure client-side aggregation over the admin's existing /orders, /admin/users,
 * /products, /categories, /deals, and /promo-codes responses. Nothing here is
 * fabricated — every figure is derived from real, already-fetched documents. Kept
 * separate from the dashboard components so the math is easy to read and verify in
 * isolation.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const PERIODS = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: 'year', label: 'This Year' },
  { id: 'custom', label: 'Custom' },
];

const startOfDay = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getUserId = (order) => order.user?._id || order.user;

/**
 * The active window for a period preset, ending "now" so partial days/years stay
 * honest. `customRange` (a { start, end } pair of Dates) is used verbatim when
 * periodId is 'custom' — resolved once by the dashboard from its date inputs.
 */
export const getPeriodRange = (periodId, now = new Date(), customRange = null) => {
  if (periodId === 'custom' && customRange) return customRange;
  const todayStart = startOfDay(now);
  if (periodId === 'today') return { start: todayStart, end: now };
  if (periodId === '7d') return { start: new Date(todayStart.getTime() - 6 * DAY_MS), end: now };
  if (periodId === '30d') return { start: new Date(todayStart.getTime() - 29 * DAY_MS), end: now };
  if (periodId === 'year') return { start: new Date(now.getFullYear(), 0, 1), end: now };
  return { start: todayStart, end: now };
};

/** The equal-length window immediately preceding the active one, for a fair "vs previous" comparison. */
export const getPreviousPeriodRange = (periodId, now = new Date(), customRange = null) => {
  if (periodId === 'year') {
    return {
      start: new Date(now.getFullYear() - 1, 0, 1),
      end: new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999),
    };
  }
  const { start, end } = getPeriodRange(periodId, now, customRange);
  const spanMs = end.getTime() - start.getTime();
  return { start: new Date(start.getTime() - spanMs), end: new Date(start.getTime() - 1) };
};

export const filterOrdersByRange = (orders, range) =>
  orders.filter((order) => {
    const created = new Date(order.createdAt).getTime();
    return created >= range.start.getTime() && created <= range.end.getTime();
  });

/** Mirrors the backend's own revenue rule (adminUserController.getStats): non-cancelled orders only. */
export const sumRevenue = (orders) =>
  orders.reduce((total, order) => (order.status === 'cancelled' ? total : total + order.total), 0);

/** Null means "no meaningful comparison" (previous period had no baseline) rather than a fake number. */
export const percentChange = (current, previous) => {
  if (previous === 0) return current === 0 ? null : null;
  return ((current - previous) / previous) * 100;
};

/**
 * The date-bucket skeleton (labels, empty values, a key function) shared by every
 * trend chart — revenue, signups, cancellations. Buckets by hour for a single day,
 * by day for anything up to ~2 months, and by month beyond that, so a long custom
 * range never floods the chart with unreadable daily ticks.
 */
const buildDateBuckets = (periodId, now, customRange) => {
  const { start, end } = getPeriodRange(periodId, now, customRange);
  const spanMs = end.getTime() - start.getTime();

  if (periodId === 'today' || (periodId === 'custom' && spanMs <= DAY_MS)) {
    const lastHour = periodId === 'today' ? now.getHours() : 23;
    return {
      start,
      end,
      buckets: Array.from({ length: lastHour + 1 }, (_, hour) => ({
        key: `h${hour}`,
        label: `${hour}:00`,
        value: 0,
      })),
      matchKey: (date) => `h${date.getHours()}`,
    };
  }

  if (periodId === 'year') {
    const currentMonth = now.getMonth();
    return {
      start,
      end,
      buckets: Array.from({ length: currentMonth + 1 }, (_, month) => ({
        key: `m${month}`,
        label: MONTH_NAMES[month],
        value: 0,
      })),
      matchKey: (date) => `m${date.getMonth()}`,
    };
  }

  const spanDays = Math.max(1, Math.round(spanMs / DAY_MS) + 1);

  if (spanDays > 60) {
    const buckets = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor.getTime() <= endMonth.getTime()) {
      buckets.push({
        key: `y${cursor.getFullYear()}m${cursor.getMonth()}`,
        label: `${MONTH_NAMES[cursor.getMonth()]} '${String(cursor.getFullYear()).slice(-2)}`,
        value: 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return { start, end, buckets, matchKey: (date) => `y${date.getFullYear()}m${date.getMonth()}` };
  }

  const dayCount = periodId === '7d' ? 7 : periodId === '30d' ? 30 : spanDays;
  const buckets = Array.from({ length: dayCount }, (_, i) => {
    const date = new Date(start.getTime() + i * DAY_MS);
    return {
      key: date.toDateString(),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: 0,
    };
  });
  return { start, end, buckets, matchKey: (date) => date.toDateString() };
};

/** Fills a date-bucket skeleton from any array of dated items — shared by every trend chart below. */
const fillTrend = (items, dateField, valueFn, periodId, now, customRange, statusFilter) => {
  const { start, end, buckets, matchKey } = buildDateBuckets(periodId, now, customRange);
  const byKey = new Map(buckets.map((bucket) => [bucket.key, bucket]));
  items
    .filter((item) => (statusFilter ? statusFilter(item) : true))
    .filter((item) => {
      const time = new Date(item[dateField]).getTime();
      return time >= start.getTime() && time <= end.getTime();
    })
    .forEach((item) => {
      const bucket = byKey.get(matchKey(new Date(item[dateField])));
      if (bucket) bucket.value += valueFn(item);
    });
  return buckets;
};

export const buildRevenueTrend = (orders, periodId, now = new Date(), customRange = null) =>
  fillTrend(orders, 'createdAt', (order) => order.total, periodId, now, customRange, (order) => order.status !== 'cancelled');

/** New user signups per bucket — the customer-growth counterpart to the revenue trend. */
export const buildSignupTrend = (users, periodId, now = new Date(), customRange = null) =>
  fillTrend(users, 'createdAt', () => 1, periodId, now, customRange);

/** Cancelled-order counts per bucket, for spotting whether cancellations are trending up. */
export const buildCancellationTrend = (orders, periodId, now = new Date(), customRange = null) =>
  fillTrend(orders, 'createdAt', () => 1, periodId, now, customRange, (order) => order.status === 'cancelled');

/** Order-count-per-bucket counterpart to the revenue trend, for the Total Orders sparkline. */
export const buildOrderCountTrend = (orders, periodId, now = new Date(), customRange = null) =>
  fillTrend(orders, 'createdAt', () => 1, periodId, now, customRange, (order) => order.status !== 'cancelled');

/** Delivered-count-per-bucket, for the Completed Orders sparkline. */
export const buildDeliveredTrend = (orders, periodId, now = new Date(), customRange = null) =>
  fillTrend(orders, 'createdAt', () => 1, periodId, now, customRange, (order) => order.status === 'delivered');

/**
 * Maps dated items into a fixed number of buckets by their *relative* position
 * within an arbitrary window — unlike buildDateBuckets this doesn't key by
 * absolute calendar date, which is exactly what's needed to overlay a previous
 * window of the same length onto the current one bucket-for-bucket.
 */
const bucketByRelativeIndex = (items, dateField, valueFn, range, bucketCount) => {
  const values = Array.from({ length: bucketCount }, () => 0);
  const spanMs = range.end.getTime() - range.start.getTime();
  items.forEach((item) => {
    const time = new Date(item[dateField]).getTime();
    if (time < range.start.getTime() || time > range.end.getTime()) return;
    const fraction = spanMs === 0 ? 0 : (time - range.start.getTime()) / spanMs;
    const index = Math.min(bucketCount - 1, Math.floor(fraction * bucketCount));
    values[index] += valueFn(item);
  });
  return values;
};

/**
 * Overlays the immediately-preceding period onto an already-built set of trend
 * buckets, aligned by relative position rather than absolute date — so "day 3 of
 * this week" lines up with "day 3 of last week" even though the calendar dates
 * differ. Adds a `previousValue` to each bucket for the chart to render as a
 * second, muted line on the same axis (same measure, same scale — never a second
 * y-axis).
 */
export const attachComparison = (buckets, items, dateField, valueFn, periodId, now, customRange, statusFilter) => {
  const previousRange = getPreviousPeriodRange(periodId, now, customRange);
  const filtered = statusFilter ? items.filter(statusFilter) : items;
  const previousValues = bucketByRelativeIndex(filtered, dateField, valueFn, previousRange, buckets.length);
  return buckets.map((bucket, index) => ({ ...bucket, previousValue: previousValues[index] }));
};

export const buildOrderStatusBreakdown = (orders) => {
  const counts = Object.fromEntries(ORDER_STATUSES.map((status) => [status, 0]));
  orders.forEach((order) => {
    if (counts[order.status] !== undefined) counts[order.status] += 1;
  });
  return ORDER_STATUSES.map((status) => ({
    status,
    label: ORDER_STATUS_LABELS[status],
    count: counts[status],
  }));
};

export const buildTopProducts = (orders, limit = 5) => {
  const byProduct = new Map();
  orders.forEach((order) => {
    if (order.status === 'cancelled') return;
    order.items.forEach((item) => {
      if (item.itemType !== 'product') return;
      const key = item.productId || item.title;
      const existing = byProduct.get(key) || {
        key,
        title: item.title,
        image: item.image,
        unitsSold: 0,
        revenue: 0,
      };
      existing.unitsSold += item.quantity;
      existing.revenue += item.lineTotal;
      byProduct.set(key, existing);
    });
  });
  return [...byProduct.values()].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, limit);
};

// ---------------------------------------------------------------------------
// Customer insights
// ---------------------------------------------------------------------------

/**
 * Splits the period's orders by whether the placing customer's first-ever order
 * (across all history, not just this period) also falls inside it — "new"
 * customers acquired this period vs. "returning" customers coming back.
 */
export const classifyCustomerOrders = (allOrders, periodOrders, periodRange) => {
  const firstOrderTimeByUser = new Map();
  allOrders.forEach((order) => {
    const userId = getUserId(order);
    if (!userId) return;
    const time = new Date(order.createdAt).getTime();
    const existing = firstOrderTimeByUser.get(userId);
    if (existing === undefined || time < existing) firstOrderTimeByUser.set(userId, time);
  });

  const isNewCustomer = (userId) => {
    const firstTime = firstOrderTimeByUser.get(userId);
    return firstTime !== undefined && firstTime >= periodRange.start.getTime();
  };

  const newCustomerIds = new Set();
  const returningCustomerIds = new Set();
  let newOrderCount = 0;
  let returningOrderCount = 0;
  let newRevenue = 0;
  let returningRevenue = 0;

  periodOrders.forEach((order) => {
    const userId = getUserId(order);
    if (!userId || order.status === 'cancelled') return;
    if (isNewCustomer(userId)) {
      newCustomerIds.add(userId);
      newOrderCount += 1;
      newRevenue += order.total;
    } else {
      returningCustomerIds.add(userId);
      returningOrderCount += 1;
      returningRevenue += order.total;
    }
  });

  return {
    newCustomers: newCustomerIds.size,
    returningCustomers: returningCustomerIds.size,
    newOrderCount,
    returningOrderCount,
    newRevenue,
    returningRevenue,
  };
};

/** Ranks customers active in the period by revenue placed during it. */
export const buildTopSpenders = (periodOrders, limit = 8) => {
  const byUser = new Map();
  periodOrders.forEach((order) => {
    if (order.status === 'cancelled') return;
    const userId = getUserId(order);
    if (!userId) return;
    const existing = byUser.get(userId) || {
      key: userId,
      title: order.user?.name || order.delivery.name,
      subtitle: order.user?.email || '',
      orderCount: 0,
      revenue: 0,
    };
    existing.orderCount += 1;
    existing.revenue += order.total;
    byUser.set(userId, existing);
  });
  return [...byUser.values()].sort((a, b) => b.revenue - a.revenue).slice(0, limit);
};

/** Among customers active this period, the share who have ever ordered more than once. */
export const computeRepeatPurchaseRate = (allOrders, periodOrders) => {
  const orderCountByUser = new Map();
  allOrders.forEach((order) => {
    const userId = getUserId(order);
    if (!userId || order.status === 'cancelled') return;
    orderCountByUser.set(userId, (orderCountByUser.get(userId) || 0) + 1);
  });

  const activeUserIds = new Set(
    periodOrders.filter((order) => order.status !== 'cancelled').map(getUserId).filter(Boolean),
  );
  if (activeUserIds.size === 0) return null;

  const repeatCount = [...activeUserIds].filter((userId) => (orderCountByUser.get(userId) || 0) > 1).length;
  return (repeatCount / activeUserIds.size) * 100;
};

/** Average lifetime (all-time) spend among customers who ordered during this period. */
export const computeAvgLifetimeValue = (allOrders, periodOrders) => {
  const lifetimeByUser = new Map();
  allOrders.forEach((order) => {
    if (order.status === 'cancelled') return;
    const userId = getUserId(order);
    if (!userId) return;
    lifetimeByUser.set(userId, (lifetimeByUser.get(userId) || 0) + order.total);
  });

  const activeUserIds = new Set(
    periodOrders.filter((order) => order.status !== 'cancelled').map(getUserId).filter(Boolean),
  );
  if (activeUserIds.size === 0) return 0;

  const total = [...activeUserIds].reduce((sum, userId) => sum + (lifetimeByUser.get(userId) || 0), 0);
  return total / activeUserIds.size;
};

// ---------------------------------------------------------------------------
// Product & category performance
// ---------------------------------------------------------------------------

/** Every available catalog product's units sold in the period, ascending — surfaces slow movers, including zero-sales items. */
export const buildWorstProducts = (products, periodOrders, limit = 5) => {
  const soldByProductId = new Map();
  periodOrders.forEach((order) => {
    if (order.status === 'cancelled') return;
    order.items.forEach((item) => {
      if (item.itemType !== 'product') return;
      soldByProductId.set(item.productId, (soldByProductId.get(item.productId) || 0) + item.quantity);
    });
  });

  return products
    .filter((product) => product.available)
    .map((product) => ({
      key: product._id,
      title: product.title,
      image: product.images?.[0] || '',
      unitsSold: soldByProductId.get(product._id) || 0,
    }))
    .sort((a, b) => a.unitsSold - b.unitsSold)
    .slice(0, limit);
};

/** Revenue grouped by catalog category for the period, richest first. */
export const buildCategoryRevenue = (products, periodOrders, categories) => {
  const categoryIdByProductId = new Map(products.map((product) => [product._id, product.categoryId]));
  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

  const revenueByCategory = new Map();
  periodOrders.forEach((order) => {
    if (order.status === 'cancelled') return;
    order.items.forEach((item) => {
      if (item.itemType !== 'product') return;
      const categoryId = categoryIdByProductId.get(item.productId);
      if (!categoryId) return;
      revenueByCategory.set(categoryId, (revenueByCategory.get(categoryId) || 0) + item.lineTotal);
    });
  });

  return [...revenueByCategory.entries()]
    .map(([categoryId, revenue]) => ({
      key: categoryId,
      title: categoryNameById.get(categoryId) || categoryId,
      revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue);
};

/** Products and deals with at least one review, worst-rated first — quality issues worth a look. */
export const buildLowRatedItems = (products, deals, limit = 5) => {
  const productItems = (products || [])
    .filter((product) => product.ratings?.totalReviews > 0)
    .map((product) => ({
      key: `product-${product._id}`,
      title: product.title,
      subtitle: 'Product',
      image: product.images?.[0] || '',
      rating: product.ratings.overallRating,
      totalReviews: product.ratings.totalReviews,
    }));
  const dealItems = (deals || [])
    .filter((deal) => deal.ratings?.totalReviews > 0)
    .map((deal) => ({
      key: `deal-${deal.id}`,
      title: deal.name,
      subtitle: 'Deal',
      image: deal.image || '',
      rating: deal.ratings.overallRating,
      totalReviews: deal.ratings.totalReviews,
    }));

  return [...productItems, ...dealItems].sort((a, b) => a.rating - b.rating).slice(0, limit);
};

const describeSelections = (item, kind) =>
  kind === 'variation'
    ? item.selections.variations.map((selection) => `${item.title} — ${selection.variationId}: ${selection.optionId}`)
    : item.selections.addons.map((addon) => `${item.title} — ${addon.addonId}`);

/** How often each product's variation option or addon was actually chosen, in orders this period. */
const buildSelectionPopularity = (periodOrders, kind, limit) => {
  const counts = new Map();
  periodOrders.forEach((order) => {
    if (order.status === 'cancelled') return;
    order.items.forEach((item) => {
      if (item.itemType !== 'product') return;
      describeSelections(item, kind).forEach((label) => {
        counts.set(label, (counts.get(label) || 0) + item.quantity);
      });
    });
  });
  return [...counts.entries()]
    .map(([label, count]) => ({ key: label, title: label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const buildVariationPopularity = (periodOrders, limit = 8) => buildSelectionPopularity(periodOrders, 'variation', limit);
export const buildAddonPopularity = (periodOrders, limit = 8) => buildSelectionPopularity(periodOrders, 'addon', limit);

// ---------------------------------------------------------------------------
// Operational analytics
// ---------------------------------------------------------------------------

/**
 * Order counts for the last 7 calendar days (today always last) x hour-of-day, for
 * spotting real rush patterns. A rolling window independent of the dashboard's period
 * filter — this always reflects "right now," not however far back the selected period
 * reaches. Each row carries its own actual weekday label since which weekday lands in
 * which row shifts by the day (today's weekday isn't always Saturday).
 */
export const buildPeakHeatmap = (orders, now = new Date()) => {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfToday);
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const grid = days.map(() => Array.from({ length: 24 }, () => 0));

  orders.forEach((order) => {
    if (order.status === 'cancelled') return;
    const orderDate = new Date(order.createdAt);
    const orderDayStart = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
    const dayIndex = Math.round((orderDayStart - startOfToday) / DAY_MS) + 6;
    if (dayIndex < 0 || dayIndex > 6) return;
    grid[dayIndex][orderDate.getHours()] += 1;
  });

  return {
    grid,
    days: days.map((date, i) => ({ label: DAY_NAMES[date.getDay()], isToday: i === 6 })),
  };
};

/**
 * Average hours between an order being placed and marked delivered. Approximated
 * from createdAt/updatedAt since individual status changes aren't timestamped —
 * accurate as long as an order's last update is the delivered transition itself.
 */
export const computeAvgFulfillmentHours = (periodOrders) => {
  const delivered = periodOrders.filter((order) => order.status === 'delivered');
  if (delivered.length === 0) return null;
  const totalHours = delivered.reduce((sum, order) => {
    const hours = (new Date(order.updatedAt).getTime() - new Date(order.createdAt).getTime()) / (60 * 60 * 1000);
    return sum + Math.max(0, hours);
  }, 0);
  return totalHours / delivered.length;
};

export const formatDuration = (hours) => {
  if (hours === null || hours === undefined) return '—';
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
};

export const computeCancellationStats = (periodOrders) => {
  const total = periodOrders.length;
  const cancelled = periodOrders.filter((order) => order.status === 'cancelled').length;
  return { cancelled, total, rate: total === 0 ? 0 : (cancelled / total) * 100 };
};

/** Real-world usage and financial impact of each promo code actually applied during the period. */
export const buildPromoCodeEffectiveness = (periodOrders, promoCodes) => {
  const byCode = new Map();
  periodOrders.forEach((order) => {
    if (!order.promoCode || order.status === 'cancelled') return;
    const existing = byCode.get(order.promoCode) || { code: order.promoCode, uses: 0, discountGiven: 0, revenue: 0 };
    existing.uses += 1;
    existing.discountGiven += order.discount;
    existing.revenue += order.total;
    byCode.set(order.promoCode, existing);
  });

  const definitionByCode = new Map((promoCodes || []).map((promo) => [promo.code, promo]));
  return [...byCode.values()]
    .map((entry) => ({
      ...entry,
      active: definitionByCode.get(entry.code)?.active ?? null,
      discountPercentage: definitionByCode.get(entry.code)?.discountPercentage ?? null,
    }))
    .sort((a, b) => b.uses - a.uses);
};

// ---------------------------------------------------------------------------
// CSV export — every table on the dashboard can save itself, no backend round-trip.
// ---------------------------------------------------------------------------

const escapeCsvValue = (value) => {
  const stringValue = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
};

/** Builds a CSV string from row objects and an ordered [key, header] column list. */
export const toCsv = (rows, columns) => {
  const headerLine = columns.map(([, header]) => escapeCsvValue(header)).join(',');
  const lines = rows.map((row) => columns.map(([key]) => escapeCsvValue(row[key])).join(','));
  return [headerLine, ...lines].join('\n');
};

/** Triggers a browser download of the given CSV content. */
export const downloadCsv = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export const formatCurrency = (amount) => `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;

export const formatCompactCurrency = (amount) => {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) return `Rs. ${(amount / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `Rs. ${(amount / 1000).toFixed(1)}K`;
  return formatCurrency(amount);
};

export const formatCount = (value) => Math.round(value).toLocaleString('en-PK');

export const formatPercent = (value) => (value === null || value === undefined ? '—' : `${value.toFixed(1)}%`);

export const formatRelativeDate = (isoDate) => {
  const target = startOfDay(new Date(isoDate));
  const today = startOfDay(new Date());
  const diffDays = Math.round((today.getTime() - target.getTime()) / DAY_MS);
  if (diffDays === 0) return 'Joined today';
  if (diffDays === 1) return 'Joined yesterday';
  if (diffDays > 1 && diffDays < 7) return `Joined ${diffDays} days ago`;
  return `Joined ${new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

export const formatOrderDate = (isoDate) => {
  const date = new Date(isoDate);
  const target = startOfDay(date);
  const today = startOfDay(new Date());
  const diffDays = Math.round((today.getTime() - target.getTime()) / DAY_MS);
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  if (diffDays === 0) return `Today, ${time}`;
  if (diffDays === 1) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${time}`;
};

/** First + last name initials, matching the same convention as the storefront's navbar avatar. */
export const getInitials = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
