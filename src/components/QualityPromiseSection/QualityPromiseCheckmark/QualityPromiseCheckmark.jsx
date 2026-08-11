import styles from './QualityPromiseCheckmark.module.css';

/**
 * QualityPromiseCheckmark
 *
 * Provides a decorative cue that improves scanning within the quality promise
 * experience.
 */
function QualityPromiseCheckmark() {
  return (
    <span className={styles.checkmark} aria-hidden="true">
      ✓
    </span>
  );
}

export default QualityPromiseCheckmark;
