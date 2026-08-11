import styles from './ProductCardRatingScore.module.css';

/**
 * ProductCardRatingScore
 *
 * Renders a formatted value within the product card presentation.
 */
function ProductCardRatingScore({ rating }) {
  return <span className={styles.score}>{rating}</span>;
}

export default ProductCardRatingScore;
