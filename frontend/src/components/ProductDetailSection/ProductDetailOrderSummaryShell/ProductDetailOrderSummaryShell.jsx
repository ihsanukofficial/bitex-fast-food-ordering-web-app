import styles from './ProductDetailOrderSummaryShell.module.css';

/**
 * ProductDetailOrderSummaryShell
 *
 * Provides the outer styling boundary for the product-detail composition.
 */
function ProductDetailOrderSummaryShell({ children }) {
  return (
    <section
      className={styles.summary}
      aria-labelledby="order-summary-title"
      aria-live="polite"
    >
      {children}
    </section>
  );
}

export default ProductDetailOrderSummaryShell;
