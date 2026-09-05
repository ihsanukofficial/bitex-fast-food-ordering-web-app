import styles from './CartLineItemShell.module.css';

/**
 * CartLineItemShell
 *
 * Provides the outer styling boundary for the cart composition.
 */
function CartLineItemShell({ children }) {
  return <article className={styles.item}>{children}</article>;
}

export default CartLineItemShell;
