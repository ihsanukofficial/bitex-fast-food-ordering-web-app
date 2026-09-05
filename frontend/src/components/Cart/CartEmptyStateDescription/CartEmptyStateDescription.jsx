import styles from './CartEmptyStateDescription.module.css';

/**
 * CartEmptyStateDescription
 *
 * Renders supporting copy for the cart experience with consistent typography.
 */
function CartEmptyStateDescription() {
  return (
    <p className={styles.description}>
      Add something delicious from the BiteX menu.
    </p>
  );
}

export default CartEmptyStateDescription;
