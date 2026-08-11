import styles from './CartPromoCodeMessage.module.css';

/**
 * CartPromoCodeMessage
 *
 * Presents contextual feedback within the cart flow.
 */
function CartPromoCodeMessage({ message }) {
  if (!message) return null;

  return (
    <p className={styles.message} aria-live="polite">
      {message}
    </p>
  );
}

export default CartPromoCodeMessage;
