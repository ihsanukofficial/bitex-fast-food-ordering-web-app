import styles from './CartPromoCodeApplyButton.module.css';

/**
 * CartPromoCodeApplyButton
 *
 * Submits promo-code validation through the surrounding form.
 */
function CartPromoCodeApplyButton({ disabled = false }) {
  return (
    <button type="submit" className={styles.button} disabled={disabled}>
      Apply
    </button>
  );
}

export default CartPromoCodeApplyButton;
