import styles from './QualityPromiseAccent.module.css';

/**
 * QualityPromiseAccent
 *
 * Provides a decorative cue that improves scanning within the quality promise
 * experience.
 */
function QualityPromiseAccent() {
  return <div className={styles.accent} aria-hidden="true" />;
}

export default QualityPromiseAccent;
