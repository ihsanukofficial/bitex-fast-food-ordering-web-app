import CartEmptyStateBrowseButton from '../CartEmptyStateBrowseButton/CartEmptyStateBrowseButton';
import CartEmptyStateDescription from '../CartEmptyStateDescription/CartEmptyStateDescription';
import CartEmptyStateIcon from '../CartEmptyStateIcon/CartEmptyStateIcon';
import CartEmptyStateTitle from '../CartEmptyStateTitle/CartEmptyStateTitle';
import styles from './CartEmptyState.module.css';

/**
 * CartEmptyState
 *
 * Provides a clear recovery path from an empty cart back to menu discovery.
 */
function CartEmptyState({ onBrowseMenu }) {
  return (
    <div className={styles.empty}>
      <CartEmptyStateIcon />
      <CartEmptyStateTitle />
      <CartEmptyStateDescription />
      <CartEmptyStateBrowseButton onClick={onBrowseMenu} />
    </div>
  );
}

export default CartEmptyState;
