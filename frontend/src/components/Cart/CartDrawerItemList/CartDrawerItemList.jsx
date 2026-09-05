import styles from './CartDrawerItemList.module.css';

/**
 * CartDrawerItemList
 *
 * Provides semantic list structure and shared spacing for cart items.
 */
function CartDrawerItemList({ children }) {
  return <div className={styles.items}>{children}</div>;
}

export default CartDrawerItemList;
