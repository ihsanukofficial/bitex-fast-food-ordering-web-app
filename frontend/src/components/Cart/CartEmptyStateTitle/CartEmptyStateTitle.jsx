import styles from './CartEmptyStateTitle.module.css';

/**
 * CartEmptyStateTitle
 *
 * Renders the cart title with its dedicated typography.
 */
function CartEmptyStateTitle() {
  return <h3 className={styles.title}>Your cart is empty</h3>;
}

export default CartEmptyStateTitle;
