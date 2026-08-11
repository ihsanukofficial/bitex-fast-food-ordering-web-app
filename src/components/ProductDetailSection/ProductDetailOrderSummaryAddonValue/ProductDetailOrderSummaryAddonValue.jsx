import styles from './ProductDetailOrderSummaryAddonValue.module.css';

/**
 * ProductDetailOrderSummaryAddonValue
 *
 * Renders a formatted value within the product-detail presentation.
 */
function ProductDetailOrderSummaryAddonValue({
  selectedAddons,
  addonsTotal,
}) {
  return (
    <span className={styles.value}>
      <span>{selectedAddons.join(', ')}</span>
      <small>+ Rs. {addonsTotal.toLocaleString('en-PK')}</small>
    </span>
  );
}

export default ProductDetailOrderSummaryAddonValue;
