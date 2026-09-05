import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailAddToCartButton.module.css';

/**
 * ProductDetailAddToCartButton
 *
 * Packages the current product configuration for cart persistence and reports the
 * resulting cart status globally.
 */
function ProductDetailAddToCartButton({
  productId,
  selections,
  selectedAddons,
  specialInstructions,
  quantity,
  total,
  disabled,
  available,
  onAddToCart,
}) {
  const handleClick = () => {
    onAddToCart?.({
      productId,
      variations: selections,
      addons: selectedAddons,
      specialInstructions,
      quantity,
      total,
    });
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon name="ri-shopping-cart-2-line" size="1.25rem" ariaLabel="" />
      {available
        ? `Add to Cart · Rs. ${total.toLocaleString('en-PK')}`
        : 'Currently unavailable'}
    </button>
  );
}

export default ProductDetailAddToCartButton;
