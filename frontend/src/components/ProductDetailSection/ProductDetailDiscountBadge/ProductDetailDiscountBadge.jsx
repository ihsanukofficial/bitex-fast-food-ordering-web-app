import styles from './ProductDetailDiscountBadge.module.css';

/**
 * ProductDetailDiscountBadge
 *
 * Presents compact promotional metadata within the product-detail experience.
 */
function ProductDetailDiscountBadge({ percentage }) {
  return <span className={styles.badge}>{percentage}% OFF</span>;
}

export default ProductDetailDiscountBadge;
