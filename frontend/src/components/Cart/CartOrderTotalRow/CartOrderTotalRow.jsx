import styles from './CartOrderTotalRow.module.css';

/**
 * CartOrderTotalRow
 *
 * Pairs a semantic label with its derived value in the cart summary.
 */
function CartOrderTotalRow({ label, value, variant = 'default' }) {
  const className = [
    styles.row,
    variant === 'discount' ? styles.discount : '',
    variant === 'grandTotal' ? styles.grandTotal : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default CartOrderTotalRow;
