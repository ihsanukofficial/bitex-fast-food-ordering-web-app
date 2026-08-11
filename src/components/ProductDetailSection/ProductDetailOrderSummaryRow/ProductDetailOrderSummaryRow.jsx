import styles from './ProductDetailOrderSummaryRow.module.css';

/**
 * ProductDetailOrderSummaryRow
 *
 * Presents one labeled value within the product-detail order summary.
 */
function ProductDetailOrderSummaryRow({
  children,
  label,
  isMissing = false,
  isTotal = false,
}) {
  return (
    <div className={`${styles.row} ${isTotal ? styles.total : ''}`}>
      <dt>{label}</dt>
      <dd className={isMissing ? styles.missing : undefined}>{children}</dd>
    </div>
  );
}

export default ProductDetailOrderSummaryRow;
