import Icon from '../../Utils/Icon/Icon';
import MenuSearchLoadingSpinner from '../MenuSearchLoadingSpinner/MenuSearchLoadingSpinner';
import styles from './MenuSearchSubmitButton.module.css';

/**
 * MenuSearchSubmitButton
 *
 * Submits the controlled menu search while exposing its transient loading state.
 */
function MenuSearchSubmitButton({ isLoading = false }) {
  return (
    <button
      type="submit"
      className={styles.submitButton}
      disabled={isLoading}
      aria-label="Submit search"
    >
      {isLoading ? (
        <MenuSearchLoadingSpinner />
      ) : (
        <Icon name="ri-search-line" size="1.35rem" color="currentColor" ariaLabel="Search" />
      )}
    </button>
  );
}

export default MenuSearchSubmitButton;
