import styles from './CartDrawerHeaderEyebrow.module.css';

/**
 * CartDrawerHeaderEyebrow
 *
 * Renders the compact contextual label that introduces the cart content.
 */
function CartDrawerHeaderEyebrow() {
  return <p className={styles.eyebrow}>Your order</p>;
}

export default CartDrawerHeaderEyebrow;
