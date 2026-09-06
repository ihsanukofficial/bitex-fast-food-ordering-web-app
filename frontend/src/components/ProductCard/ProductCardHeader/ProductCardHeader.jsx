import styles from './ProductCardHeader.module.css';

/**
 * ProductCardHeader
 *
 * Pairs the title with its rating on one line so the now-wide, short card doesn't
 * need a whole extra row just for the rating.
 */
function ProductCardHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default ProductCardHeader;
