import styles from './CartLineItemTitle.module.css';

/**
 * CartLineItemTitle
 *
 * Renders the cart title with its dedicated typography.
 */
function CartLineItemTitle({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default CartLineItemTitle;
