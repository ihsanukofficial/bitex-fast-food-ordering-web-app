import styles from './CartDrawerStatus.module.css';

/**
 * CartDrawerStatus
 *
 * Centers a loading or error message in place of the item list while the cart is
 * being fetched from, or failed to load from, the backend.
 */
function CartDrawerStatus({ tone = 'loading', children }) {
  return (
    <div className={styles.status} data-tone={tone} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}

export default CartDrawerStatus;
