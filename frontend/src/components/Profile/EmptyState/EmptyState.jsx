import Icon from '../../Utils/Icon/Icon';
import styles from './EmptyState.module.css';

/**
 * EmptyState
 *
 * Shared "nothing here yet" block for any profile section backed by an empty list,
 * with an optional action so the customer always has somewhere useful to go next.
 */
function EmptyState({ icon = 'ri-article-line', title, message, actionLabel, onAction }) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon} aria-hidden="true">
        <Icon name={icon} size="1.8rem" ariaLabel="" />
      </span>
      {title && <p className={styles.title}>{title}</p>}
      {message && <p className={styles.message}>{message}</p>}
      {actionLabel && onAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
