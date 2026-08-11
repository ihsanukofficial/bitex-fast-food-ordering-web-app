import styles from './ProductDetailQuantityValue.module.css';

/**
 * ProductDetailQuantityValue
 *
 * Renders a formatted value within the product-detail presentation.
 */
function ProductDetailQuantityValue({ quantity }) {
  return (
    <output className={styles.value} aria-live="polite">
      {quantity}
    </output>
  );
}

export default ProductDetailQuantityValue;
