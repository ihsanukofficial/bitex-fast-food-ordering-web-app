import styles from './CartPromoCodeControls.module.css';

/**
 * CartPromoCodeControls
 *
 * Groups related controls within the cart interaction flow.
 */
function CartPromoCodeControls({ children }) {
  return <div className={styles.controls}>{children}</div>;
}

export default CartPromoCodeControls;
