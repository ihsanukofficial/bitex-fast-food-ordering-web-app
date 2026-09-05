import Icon from '../../Utils/Icon/Icon';
import styles from './ErrorState.module.css';

/**
 * ErrorState
 *
 * Shared failure block for any profile section whose data request failed, with a
 * retry action so a transient network error never strands the customer.
 */
function ErrorState({ message = 'Something went wrong while loading your account.', onRetry }) {
  return (
    <div className={styles.error} role="alert">
      <span className={styles.icon} aria-hidden="true">
        <Icon name="ri-alert-line" size="1.6rem" ariaLabel="" />
      </span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
