import styles from './CartPromoCodeLabel.module.css';

/**
 * CartPromoCodeLabel
 *
 * Renders the semantic label used by the cart presentation.
 */
function CartPromoCodeLabel({ inputId }) {
  return (
    <label className={styles.label} htmlFor={inputId}>
      Promo code
    </label>
  );
}

export default CartPromoCodeLabel;
