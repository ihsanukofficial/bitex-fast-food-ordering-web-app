import Icon from '../../Utils/Icon/Icon';
import useReviewActions from '../../../hooks/useReviewActions';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ProductDetailReviewStars from '../../ProductDetailSection/ProductDetailReviewStars/ProductDetailReviewStars';
import ReviewForm from '../ReviewForm/ReviewForm';
import { formatOrderDate } from '../../../utils/orderStatus';
import styles from './ReviewCard.module.css';

/**
 * ReviewCard
 *
 * One submitted review in the "My Reviews" list — product image, rating, text, and
 * the edit/delete actions for that specific review.
 */
function ReviewCard({ orderId, itemIndex, item, onUpdated, onDeleted }) {
  const { review } = item;
  const {
    isFormOpen,
    openForm,
    closeForm,
    submitReview,
    isConfirmingDelete,
    openDeleteConfirm,
    closeDeleteConfirm,
    deleteReview,
    isDeleting,
    deleteError,
  } = useReviewActions({ orderId, itemIndex, review, onSubmitted: onUpdated, onDeleted });

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {item.image ? (
          <img className={styles.image} src={item.image} alt="" width="56" height="56" />
        ) : (
          <span className={styles.imageFallback} aria-hidden="true">
            <Icon name="ri-restaurant-2-fill" size="1.25rem" ariaLabel="" />
          </span>
        )}
        <div className={styles.info}>
          <p className={styles.productName}>{item.title}</p>
          <div className={styles.ratingRow}>
            <ProductDetailReviewStars rating={review.stars} />
            <span className={styles.date}>{formatOrderDate(review.createdAt)}</span>
          </div>
        </div>
      </div>

      {isFormOpen ? (
        <ReviewForm
          productTitle={item.title}
          initialStars={review.stars}
          initialText={review.text}
          submitLabel="Save Changes"
          onSubmit={submitReview}
          onCancel={closeForm}
        />
      ) : (
        <>
          <p className={styles.text}>{review.text}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.editButton} onClick={openForm}>
              <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
              Edit
            </button>
            <button type="button" className={styles.deleteButton} onClick={openDeleteConfirm}>
              <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
              Delete
            </button>
          </div>
        </>
      )}

      {isConfirmingDelete && (
        <ConfirmationModal
          title="Delete review?"
          message={deleteError || 'Are you sure you want to delete this review?'}
          confirmLabel="Delete Review"
          isConfirming={isDeleting}
          onConfirm={deleteReview}
          onCancel={closeDeleteConfirm}
        />
      )}
    </div>
  );
}

export default ReviewCard;
