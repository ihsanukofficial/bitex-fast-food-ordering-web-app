import ProductDetailReview from '../ProductDetailReview/ProductDetailReview';
import ProductDetailReviewsHeading from '../ProductDetailReviewsHeading/ProductDetailReviewsHeading';
import ProductDetailReviewsList from '../ProductDetailReviewsList/ProductDetailReviewsList';
import styles from './ProductDetailReviews.module.css';

const formatReviewDate = (isoString) =>
  isoString
    ? new Date(isoString).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
    : undefined;

/**
 * ProductDetailReviews
 *
 * Composes the customer-review section and omits it when the product has no review
 * data.
 */
function ProductDetailReviews({ reviews }) {
  return (
    <section className={styles.reviews}>
      <ProductDetailReviewsHeading />
      <ProductDetailReviewsList>
        {[...reviews].reverse().map((review, index) => (
          <ProductDetailReview
            key={review._id || `${review.text}-${index}`}
            reviewerName={review.reviewerName}
            reviewDate={formatReviewDate(review.createdAt)}
            rating={review.stars}
            feedback={review.text}
          />
        ))}
      </ProductDetailReviewsList>
    </section>
  );
}

export default ProductDetailReviews;
