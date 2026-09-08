import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import Icon from '../../../components/Utils/Icon/Icon';
import { PERIODS, filterOrdersByRange, getPeriodRange } from '../AdminDashboard/dashboardAnalytics';
import adminStyles from '../admin.module.css';
import styles from './AdminReviews.module.css';

const STAR_VALUES = [1, 2, 3, 4, 5];
// Same period/date-range control as AdminOrders and the analytics dashboard — "All
// Time" is prepended since (unlike the dashboard's own report) this is a browse tool,
// where defaulting to a 30-day window would just hide an older review someone's
// looking for.
const REVIEW_PERIODS = [{ id: 'all', label: 'All Time' }, ...PERIODS];

const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });

/** Renders a static five-star rating using the shared Icon component. */
function StarDisplay({ rating }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {STAR_VALUES.map((star) => (
        <Icon
          key={star}
          name={star <= rating ? 'ri-star-fill' : 'ri-star-line'}
          color={star <= rating ? '#fca810' : '#d9d9d9'}
          size="0.95rem"
          ariaLabel=""
        />
      ))}
    </span>
  );
}

/**
 * AdminReviews
 *
 * Every real customer review across the catalog in one place — the admin's view
 * into the same Review collection the storefront's product pages and profile
 * order-history draw from. Deleting here is the admin's own moderation path,
 * distinct from a customer deleting their own review, but keeps the target
 * product's aggregate rating in sync exactly the same way.
 */
function AdminReviews() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [period, setPeriod] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const load = () => apiClient.get('/admin/reviews').then((data) => setReviews(data.reviews));

  useEffect(() => {
    load().catch((requestError) => setError(requestError.message));
  }, []);

  const handleDelete = async (review) => {
    const who = review.reviewer?.name ? ` from ${review.reviewer.name}` : '';
    if (!window.confirm(`Delete this review${who}?`)) return;

    setDeletingId(review._id);
    try {
      await apiClient.delete(`/admin/reviews/${review._id}`);
      setReviews((current) => current.filter((entry) => entry._id !== review._id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
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

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];

    const reviewsInRange =
      period === 'all'
        ? reviews
        : filterOrdersByRange(
            reviews,
            getPeriodRange(
              period,
              new Date(),
              period === 'custom' && customStart && customEnd
                ? { start: new Date(`${customStart}T00:00:00`), end: new Date(`${customEnd}T23:59:59.999`) }
                : null,
            ),
          );

    const query = search.trim().toLowerCase();
    return reviewsInRange.filter((review) => {
      if (ratingFilter && review.stars !== Number(ratingFilter)) return false;
      if (!query) return true;
      return (
        review.product?.title?.toLowerCase().includes(query) ||
        review.deal?.title?.toLowerCase().includes(query) ||
        review.reviewer?.name?.toLowerCase().includes(query) ||
        review.reviewer?.email?.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query)
      );
    });
  }, [reviews, search, ratingFilter, period, customStart, customEnd]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((total, review) => total + review.stars, 0) / reviews.length;
  }, [reviews]);

  const isLoading = reviews === null && !error;
  const hasReviews = Boolean(reviews && reviews.length > 0);

  return (
    <div className={adminStyles.panel}>
      <div className={adminStyles.panelHeader}>
        <div className={adminStyles.panelHeaderText}>
          <h1 className={adminStyles.panelTitle}>Reviews</h1>
          <p className={adminStyles.panelSubtitle}>
            {reviews ? `${reviews.length} customer review${reviews.length === 1 ? '' : 's'} across the catalog` : 'Loading reviews…'}
          </p>
        </div>
      </div>

      {error && <p className={adminStyles.error}>{error}</p>}

      {hasReviews && (
        <>
          <div className={adminStyles.statGrid} style={{ marginBottom: '1.5rem' }}>
            <div className={adminStyles.statCard}>
              <div className={adminStyles.statCardHeader}>
                <p className={adminStyles.statLabel}>Total Reviews</p>
                <span className={adminStyles.statIcon} aria-hidden="true">
                  <Icon name="ri-star-fill" size="1.1rem" ariaLabel="" />
                </span>
              </div>
              <p className={adminStyles.statValue}>{reviews.length}</p>
            </div>
            <div className={adminStyles.statCard}>
              <div className={adminStyles.statCardHeader}>
                <p className={adminStyles.statLabel}>Average Rating</p>
                <span className={adminStyles.statIcon} aria-hidden="true">
                  <Icon name="ri-checkbox-circle-fill" size="1.1rem" ariaLabel="" />
                </span>
              </div>
              <p className={adminStyles.statValue}>{averageRating.toFixed(1)}</p>
            </div>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchField}>
              <Icon name="ri-search-line" size="1rem" ariaLabel="" />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search by product, customer, or review text…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <select
              className={styles.ratingSelect}
              value={ratingFilter}
              onChange={(event) => setRatingFilter(event.target.value)}
              aria-label="Filter by rating"
            >
              <option value="">All ratings</option>
              {[...STAR_VALUES].reverse().map((star) => (
                <option key={star} value={star}>
                  {star} star{star > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={adminStyles.controlsRow}>
            <div className={adminStyles.periodFilter} role="group" aria-label="Time period">
              {REVIEW_PERIODS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={entry.id === period ? adminStyles.periodButtonActive : adminStyles.periodButton}
                  onClick={() => handlePeriodClick(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>
            {period === 'custom' && (
              <div className={adminStyles.customRangeRow}>
                <input
                  type="date"
                  value={customStart}
                  max={customEnd || undefined}
                  onChange={(event) => setCustomStart(event.target.value)}
                  aria-label="Custom range start date"
                />
                <span className={adminStyles.customRangeSeparator}>to</span>
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
        </>
      )}

      {isLoading && (
        <div className={styles.reviewList}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      )}

      {!isLoading && reviews && reviews.length === 0 && (
        <div className={adminStyles.emptyState}>
          No reviews yet — they&rsquo;ll appear here once customers start reviewing delivered orders.
        </div>
      )}

      {!isLoading && hasReviews && filteredReviews.length === 0 && (
        <div className={adminStyles.emptyState}>No reviews match your search.</div>
      )}

      {!isLoading && filteredReviews.length > 0 && (
        <ul className={styles.reviewList}>
          {filteredReviews.map((review) => (
            <li key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewProduct}>
                {review.product?.image || review.deal?.image ? (
                  <img className={adminStyles.tableImage} src={review.product?.image || review.deal?.image} alt="" />
                ) : (
                  <span className={adminStyles.tableImagePlaceholder} aria-hidden="true">
                    <Icon name="ri-restaurant-2-fill" size="1.1rem" ariaLabel="" />
                  </span>
                )}
                <div className={styles.reviewProductText}>
                  <p className={styles.productTitle}>
                    {review.product?.title ||
                      review.deal?.title ||
                      `${review.itemType === 'deal' ? 'Deal' : 'Product'} no longer available`}
                  </p>
                  <StarDisplay rating={review.stars} />
                </div>
              </div>

              <div className={styles.reviewBody}>
                <p className={styles.reviewText}>{review.text}</p>
                <div className={styles.reviewMeta}>
                  <span className={styles.reviewer}>
                    {review.reviewer?.name || 'Unknown customer'}
                    {review.reviewer?.email && <span className={styles.reviewerEmail}> · {review.reviewer.email}</span>}
                  </span>
                  <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                </div>
              </div>

              <button
                type="button"
                className={adminStyles.dangerButton}
                onClick={() => handleDelete(review)}
                disabled={deletingId === review._id}
              >
                <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                {deletingId === review._id ? 'Deleting…' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminReviews;
