import styles from './CartDrawerHeaderItemCount.module.css';

/**
 * CartDrawerHeaderItemCount
 *
 * Presents a derived item count within the cart experience.
 */
function CartDrawerHeaderItemCount({ itemCount }) {
  return (
    <p className={styles.count}>
      {itemCount} item{itemCount === 1 ? '' : 's'}
    </p>
  );
}

export default CartDrawerHeaderItemCount;
