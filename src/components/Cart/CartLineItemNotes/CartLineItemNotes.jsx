import styles from './CartLineItemNotes.module.css';

/**
 * CartLineItemNotes
 *
 * Preserves customer instructions alongside the related cart entry.
 */
function CartLineItemNotes({ notes }) {
  if (!notes) return null;
  return <p className={styles.notes}>“{notes}”</p>;
}

export default CartLineItemNotes;
