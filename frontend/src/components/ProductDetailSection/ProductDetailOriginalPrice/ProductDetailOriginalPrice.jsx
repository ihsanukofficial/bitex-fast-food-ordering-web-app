import styles from './ProductDetailOriginalPrice.module.css';

/**
 * ProductDetailOriginalPrice
 *
 * Formats and presents a price value within the product-detail experience.
 */
function ProductDetailOriginalPrice({ price, hasDiscount }) {
  return (
    <span className={hasDiscount ? styles.discountedOriginal : styles.original}>
      Rs. {price.toLocaleString('en-PK')}
    </span>
  );
}

export default ProductDetailOriginalPrice;
