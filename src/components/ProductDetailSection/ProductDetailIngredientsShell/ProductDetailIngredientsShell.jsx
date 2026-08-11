import styles from './ProductDetailIngredientsShell.module.css';

/**
 * ProductDetailIngredientsShell
 *
 * Provides the outer styling boundary for the product-detail composition.
 */
function ProductDetailIngredientsShell({ children, isOpen }) {
  return (
    <section
      className={`${styles.accordion} ${isOpen ? styles.open : ''}`}
    >
      {children}
    </section>
  );
}

export default ProductDetailIngredientsShell;
