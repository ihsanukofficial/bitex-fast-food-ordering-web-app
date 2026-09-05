import styles from './ProductCardAddToCartButton.module.css';

/**
 * ProductCardAddToCartButton
 *
 * Provides the quick-add action for a catalog product.
 */
function ProductCardAddToCartButton({ onClick, disabled = false, label = 'Add to Cart' }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default ProductCardAddToCartButton;
