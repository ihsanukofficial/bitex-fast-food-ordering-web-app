import Icon from '../Icon/Icon';
import styles from './EditableControls.module.css';

/**
 * RemoveItemButton
 *
 * A small "×" badge meant to sit in the corner of a repeatable card (a reason, a
 * stat, a promise…) inside AdminLiveEditor. The caller's root element just needs
 * `position: relative` — pass `hasFrame` to also get a dashed outline showing which
 * element it will remove.
 */
export function RemoveItemButton({ onClick, label = 'Remove' }) {
  return (
    <button type="button" className={styles.removeButton} onClick={onClick} aria-label={label} title={label}>
      <Icon name="ri-close-line" size="0.9rem" ariaLabel="" />
    </button>
  );
}

/**
 * AddItemButton
 *
 * Appended after a repeatable list while editing, to add a new blank entry.
 */
export function AddItemButton({ onClick, children }) {
  return (
    <button type="button" className={styles.addButton} onClick={onClick}>
      <Icon name="ri-add-line" size="1.1rem" ariaLabel="" />
      {children}
    </button>
  );
}
