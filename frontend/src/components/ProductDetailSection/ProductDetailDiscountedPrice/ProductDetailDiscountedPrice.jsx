import styles from './ProductDetailDiscountedPrice.module.css';

/**
 * ProductDetailDiscountedPrice
 *
 * Formats and presents a price value within the product-detail experience.
 */
function ProductDetailDiscountedPrice({ price }) {
  return (
    <span className={styles.discountedPrice}>
      Rs. {price.toLocaleString('en-PK')}
    </span>
  );
}

export default ProductDetailDiscountedPrice;
