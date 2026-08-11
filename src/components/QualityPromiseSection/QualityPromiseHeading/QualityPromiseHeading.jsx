import styles from './QualityPromiseHeading.module.css';

/**
 * QualityPromiseHeading
 *
 * Renders the semantic heading for the quality promise experience with
 * feature-specific presentation.
 */
function QualityPromiseHeading() {
  return (
    <h2 id="quality-heading" className={styles.heading}>
      Made right, not just made fast
    </h2>
  );
}

export default QualityPromiseHeading;
