import styles from './CartPromoCodeApplyButton.module.css';

/**
 * CartPromoCodeApplyButton
 *
 * Submits promo-code validation through the surrounding form.
 */
function CartPromoCodeApplyButton() {
  return (
    <button type="submit" className={styles.button}>
      Apply
    </button>
  );
}

export default CartPromoCodeApplyButton;
