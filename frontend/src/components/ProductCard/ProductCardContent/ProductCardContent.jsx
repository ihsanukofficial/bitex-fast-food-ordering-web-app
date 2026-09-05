import styles from './ProductCardContent.module.css';

/**
 * ProductCardContent
 *
 * Keeps product card content layout separate from stateful orchestration.
 */
function ProductCardContent({ children }) {
  return <section className={styles.content}>{children}</section>;
}

export default ProductCardContent;
