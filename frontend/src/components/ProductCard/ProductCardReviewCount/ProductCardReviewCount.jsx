import styles from './ProductCardReviewCount.module.css';

/**
 * ProductCardReviewCount
 *
 * Presents a derived item count within the product card experience.
 */
function ProductCardReviewCount({ reviewCount }) {
  return <span className={styles.count}>({reviewCount} reviews)</span>;
}

export default ProductCardReviewCount;
