import { useRef, useState } from 'react';
import Icon from '../../Utils/Icon/Icon';
import EmptyState from '../EmptyState/EmptyState';
import OrderItemReview from '../OrderItemReview/OrderItemReview';
import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './ReviewList.module.css';

// Delivered-but-unreviewed prompts are open-ended — a customer with a long order
// history can rack up dozens. Left unbounded, that list pushes "My Reviews" (the
// reviews they've actually already written, which is what this whole tab is named
// for) far enough down that reaching it means scrolling past every pending prompt.
const INITIAL_PENDING_COUNT = 3;

/**
 * Flattens every order into its individual product lines so reviews (which live per
 * order-item, not per order) can be listed and filtered directly.
 */
const flattenReviewableItems = (orders) =>
  orders.flatMap((order) =>
    order.items.map((item, itemIndex) => ({ order, item, itemIndex })),
  );

/**
 * ReviewList
 *
 * The "My Reviews" hub: everything the customer has already reviewed, plus a prompt
 * for delivered items (products or deals) that are still eligible for a first review —
 * eligibility is the same server-enforced rule OrderItemReview already applies
 * (delivered order, item still available, not already reviewed).
 */
function ReviewList({ orders, onReviewUpdated, onReviewDeleted, onBrowseMenu }) {
  const [showAllPending, setShowAllPending] = useState(false);
  const pendingSectionRef = useRef(null);
  const allItems = flattenReviewableItems(orders);

  const reviewed = allItems
    .filter((entry) => entry.item.review)
    .sort((a, b) => new Date(b.item.review.createdAt) - new Date(a.item.review.createdAt));

  const pending = allItems.filter(
    (entry) =>
      entry.order.status === 'delivered' &&
      !entry.item.review &&
      entry.item.itemAvailable,
  );

  const visiblePending = showAllPending ? pending : pending.slice(0, INITIAL_PENDING_COUNT);
  const hiddenPendingCount = pending.length - visiblePending.length;

  // Collapsing a long expanded list shortens the page a lot — without this, whatever
  // was under the cursor at click time (often well below the fold) is left stranded,
  // looking like the click did nothing.
  const collapsePending = () => {
    setShowAllPending(false);
    pendingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (reviewed.length === 0 && pending.length === 0) {
    return (
      <section className={styles.section} aria-labelledby="my-reviews-heading">
        <h2 id="my-reviews-heading" className={styles.heading}>
          My Reviews
        </h2>
        <EmptyState
          icon="ri-star-line"
          title="You haven't written any reviews yet."
          message="Once your delivered orders arrive, you can rate and review each item here."
          actionLabel="Browse Menu"
          onAction={onBrowseMenu}
        />
      </section>
    );
  }

  return (
    <div className={styles.wrapper}>
      {pending.length > 0 && (
        <section
          id="awaiting-your-review"
          ref={pendingSectionRef}
          className={styles.section}
          aria-labelledby="pending-reviews-heading"
        >
          <h2 id="pending-reviews-heading" className={styles.heading}>
            Awaiting Your Review <span className={styles.headingCount}>({pending.length})</span>
          </h2>
          <div className={styles.pendingList}>
            {visiblePending.map(({ order, item, itemIndex }) => (
              <div key={`${order._id}:${itemIndex}`} className={styles.pendingRow}>
                {item.image ? (
                  <img className={styles.pendingImage} src={item.image} alt="" width="48" height="48" />
                ) : (
                  <span className={styles.pendingImageFallback} aria-hidden="true">
                    <Icon name="ri-restaurant-2-fill" size="1.1rem" ariaLabel="" />
                  </span>
                )}
                <div className={styles.pendingBody}>
                  <p className={styles.pendingTitle}>{item.title}</p>
                  <OrderItemReview
                    orderId={order._id}
                    itemIndex={itemIndex}
                    item={item}
                    isDelivered
                    onSubmitted={(review) => onReviewUpdated(order._id, itemIndex, review)}
                    onDeleted={() => onReviewDeleted(order._id, itemIndex)}
                  />
                </div>
              </div>
            ))}
          </div>
          {hiddenPendingCount > 0 && (
            <button type="button" className={styles.showMoreButton} onClick={() => setShowAllPending(true)}>
              Show {hiddenPendingCount} more
              <Icon name="ri-arrow-down-s-line" size="1.05rem" ariaLabel="" />
            </button>
          )}
          {showAllPending && pending.length > INITIAL_PENDING_COUNT && (
            <button type="button" className={styles.showMoreButton} onClick={collapsePending}>
              Show less
              <Icon name="ri-arrow-up-s-line" size="1.05rem" ariaLabel="" />
            </button>
          )}
        </section>
      )}

      <section className={styles.section} aria-labelledby="my-reviews-heading">
        <h2 id="my-reviews-heading" className={styles.heading}>
          My Reviews
        </h2>
        {reviewed.length === 0 ? (
          <p className={styles.noneYet}>You haven&rsquo;t submitted any reviews yet.</p>
        ) : (
          <div className={styles.reviewGrid}>
            {reviewed.map(({ order, item, itemIndex }) => (
              <ReviewCard
                key={`${order._id}:${itemIndex}`}
                orderId={order._id}
                itemIndex={itemIndex}
                item={item}
                onUpdated={(review) => onReviewUpdated(order._id, itemIndex, review)}
                onDeleted={() => onReviewDeleted(order._id, itemIndex)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReviewList;
