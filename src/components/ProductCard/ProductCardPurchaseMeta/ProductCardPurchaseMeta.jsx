import styles from './ProductCardPurchaseMeta.module.css';

/**
 * ProductCardPurchaseMeta
 *
 * Keeps rating and configuration guidance aligned as one compact metadata region.
 */
function ProductCardPurchaseMeta({ children }) {
  return <div className={styles.meta}>{children}</div>;
}

export default ProductCardPurchaseMeta;
