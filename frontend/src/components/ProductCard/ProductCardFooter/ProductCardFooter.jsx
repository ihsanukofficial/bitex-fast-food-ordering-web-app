import styles from './ProductCardFooter.module.css';

/**
 * ProductCardFooter
 *
 * Pairs price and the add-to-cart action on one row, pinned to the bottom of the
 * content column — the wide card has the room for this instead of stacking a
 * full-width button under the price the way a tall card needed to.
 */
function ProductCardFooter({ children }) {
  return <div className={styles.footer}>{children}</div>;
}

export default ProductCardFooter;
