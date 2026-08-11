import styles from './CartLineItemActions.module.css';

/**
 * CartLineItemActions
 *
 * Groups the primary actions exposed by the cart experience.
 */
function CartLineItemActions({ children }) {
  return <div className={styles.actions}>{children}</div>;
}

export default CartLineItemActions;
