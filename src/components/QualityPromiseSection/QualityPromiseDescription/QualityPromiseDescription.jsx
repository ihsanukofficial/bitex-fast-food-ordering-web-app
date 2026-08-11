import styles from './QualityPromiseDescription.module.css';

/**
 * QualityPromiseDescription
 *
 * Renders supporting copy for the quality promise experience with consistent
 * typography.
 */
function QualityPromiseDescription() {
  return (
    <p className={styles.description}>
      Fast food should never mean cutting corners. Our kitchen teams focus on
      the details that turn familiar favorites into meals you can trust.
    </p>
  );
}

export default QualityPromiseDescription;
