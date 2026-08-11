import styles from './ProductCardAddToCartButton.module.css';

/**
 * ProductCardAddToCartButton
 *
 * Provides the quick-add action for a catalog product.
 */
function ProductCardAddToCartButton({ onClick }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
    >
      Add to Cart
    </button>
  );
}

export default ProductCardAddToCartButton;
