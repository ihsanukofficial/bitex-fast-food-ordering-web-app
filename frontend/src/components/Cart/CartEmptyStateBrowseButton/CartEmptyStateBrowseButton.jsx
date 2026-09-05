import styles from './CartEmptyStateBrowseButton.module.css';

/**
 * CartEmptyStateBrowseButton
 *
 * Provides the recovery action from an empty cart to menu discovery.
 */
function CartEmptyStateBrowseButton({ onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Browse menu
    </button>
  );
}

export default CartEmptyStateBrowseButton;
