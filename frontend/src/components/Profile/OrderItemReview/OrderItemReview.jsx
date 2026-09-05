import useReviewActions from '../../../hooks/useReviewActions';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ProductDetailReviewStars from '../../ProductDetailSection/ProductDetailReviewStars/ProductDetailReviewStars';
import ReviewForm from '../ReviewForm/ReviewForm';
import styles from './OrderItemReview.module.css';

const formatReviewDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * OrderItemReview
 *
 * Lets a customer rate, review, edit, and delete their review for one line of a
 * delivered order (a product or a deal), shown inline right next to that item — only
 * once the order is delivered, re-enforced server-side; this is just the matching UI
 * gate. Renders nothing for a non-reviewable line.
 */
function OrderItemReview({ orderId, itemIndex, item, isDelivered, onSubmitted, onDeleted }) {
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
  } = useReviewActions({ orderId, itemIndex, review: item.review, onSubmitted, onDeleted });

  if (!isDelivered) return null;

  if (!item.review && !item.itemAvailable) {
    const noun = item.itemType === 'deal' ? 'deal' : 'product';
    return <p className={styles.unavailable}>This {noun} is no longer available to review.</p>;
  }

  if (isFormOpen) {
    return (
      <ReviewForm
        productTitle={item.title}
        initialStars={item.review?.stars || 0}
        initialText={item.review?.text || ''}
        submitLabel={item.review ? 'Save Changes' : 'Submit Review'}
        onSubmit={submitReview}
        onCancel={closeForm}
      />
    );
  }

  return (
    <>
      {item.review ? (
        <div className={styles.submitted}>
          <div className={styles.submittedHeader}>
            <ProductDetailReviewStars rating={item.review.stars} />
            <span className={styles.submittedDate}>Reviewed {formatReviewDate(item.review.createdAt)}</span>
          </div>
          <p className={styles.submittedText}>{item.review.text}</p>
          <div className={styles.reviewActions}>
            <button type="button" className={styles.editButton} onClick={openForm}>
              Edit
            </button>
            <button type="button" className={styles.deleteButton} onClick={openDeleteConfirm}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className={styles.addButton} onClick={openForm}>
          Rate &amp; review this item
        </button>
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
    </>
  );
}

export default OrderItemReview;
