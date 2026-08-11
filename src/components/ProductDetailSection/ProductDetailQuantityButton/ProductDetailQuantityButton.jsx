import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailQuantityButton.module.css';

/**
 * ProductDetailQuantityButton
 *
 * Provides a bounded increment or decrement action for product quantity.
 */
function ProductDetailQuantityButton({ operation, onClick, disabled }) {
  const isDecrease = operation === 'decrease';

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${isDecrease ? 'Decrease' : 'Increase'} quantity`}
    >
      <Icon
        name={isDecrease ? 'ri-subtract-line' : 'ri-add-line'}
        ariaLabel=""
      />
    </button>
  );
}

export default ProductDetailQuantityButton;
