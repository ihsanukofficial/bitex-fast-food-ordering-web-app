import styles from './ProductCardInfoList.module.css';

/**
 * ProductCardInfoList
 *
 * Provides semantic list structure and shared spacing for product card items.
 */
function ProductCardInfoList({ children }) {
  return <dl className={styles.list}>{children}</dl>;
}

export default ProductCardInfoList;
