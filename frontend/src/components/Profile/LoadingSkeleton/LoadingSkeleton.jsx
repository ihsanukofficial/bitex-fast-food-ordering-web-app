import styles from './LoadingSkeleton.module.css';

/**
 * LoadingSkeleton
 *
 * Shared placeholder shapes shown while a profile section's data is in flight, so
 * loading states never render as a blank area. `variant` selects the shape ("stat",
 * "row", or "card") and `count` how many to repeat.
 */
function LoadingSkeleton({ variant = 'row', count = 3 }) {
  return (
    <div className={styles.group} data-variant={variant} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.item} data-variant={variant} />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
