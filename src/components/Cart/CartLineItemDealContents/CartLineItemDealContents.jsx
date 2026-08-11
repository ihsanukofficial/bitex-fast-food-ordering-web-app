import styles from './CartLineItemDealContents.module.css';

/**
 * CartLineItemDealContents
 *
 * Summarizes bundled deal contents without expanding them into independent cart lines.
 */
function CartLineItemDealContents({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <p className={styles.items}>
      <strong>Includes:</strong> {items.join(', ')}
    </p>
  );
}

export default CartLineItemDealContents;
