import Icon from '../../Utils/Icon/Icon';
import { MAX_CART_ITEM_QUANTITY } from '../../../utils/cartConstants';
import styles from './DealDetailQuantitySelector.module.css';

/**
 * DealDetailQuantitySelector
 *
 * Constrains quantity changes to supported order limits before forwarding them to the
 * route owner.
 */
function DealDetailQuantitySelector({ quantity, onChange }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Quantity</span>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Icon name="ri-subtract-line" ariaLabel="" />
        </button>
        <output className={styles.value} aria-live="polite">
          {quantity}
        </output>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(quantity + 1)}
          disabled={quantity >= MAX_CART_ITEM_QUANTITY}
          aria-label="Increase quantity"
        >
          <Icon name="ri-add-line" ariaLabel="" />
        </button>
      </div>
    </div>
  );
}

export default DealDetailQuantitySelector;
