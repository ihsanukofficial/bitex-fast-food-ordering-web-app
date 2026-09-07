import Icon from '../../Utils/Icon/Icon';
import MenuSearchLoadingSpinner from '../MenuSearchLoadingSpinner/MenuSearchLoadingSpinner';
import styles from './MenuSearchSubmitButton.module.css';

/**
 * MenuSearchSubmitButton
 *
 * Submits the controlled menu search while exposing its transient loading state.
 * Stays a compact square icon button at every width now (see MenuSearchInputRow,
 * which pairs it with the search field instead of letting it stretch full-width on
 * its own row) — the icon alone reads as "search" clearly enough on its own.
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
        <Icon name="ri-search-line" size="1.2rem" color="currentColor" ariaLabel="" />
      )}
    </button>
  );
}

export default MenuSearchSubmitButton;
