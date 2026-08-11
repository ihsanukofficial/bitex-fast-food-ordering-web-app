import styles from './CartDrawerHeaderText.module.css';

/**
 * CartDrawerHeaderText
 *
 * Provides the styled text primitive used by the cart composition.
 */
function CartDrawerHeaderText({ children }) {
  return <div className={styles.text}>{children}</div>;
}

export default CartDrawerHeaderText;
