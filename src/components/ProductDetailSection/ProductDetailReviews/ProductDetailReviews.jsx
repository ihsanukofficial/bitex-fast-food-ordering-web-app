import ProductDetailReview from '../ProductDetailReview/ProductDetailReview';
import ProductDetailReviewsHeading from '../ProductDetailReviewsHeading/ProductDetailReviewsHeading';
import ProductDetailReviewsList from '../ProductDetailReviewsList/ProductDetailReviewsList';
import styles from './ProductDetailReviews.module.css';

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
        {reviews.map((review, index) => (
          <ProductDetailReview
            key={`${review.text}-${index}`}
            reviewerName={review.reviewerName}
            reviewDate={review.reviewDate}
            rating={review.stars}
            feedback={review.text}
          />
        ))}
      </ProductDetailReviewsList>
    </section>
  );
}

export default ProductDetailReviews;
