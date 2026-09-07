import styles from './QualityPromiseHeading.module.css';

/**
 * QualityPromiseHeading
 *
 * Renders the semantic heading for the quality promise experience with
 * feature-specific presentation.
 */
function QualityPromiseHeading({ children = 'Made right, not just made fast' }) {
  return (
    <h2 id="quality-heading" className={styles.heading}>
      {children}
    </h2>
  );
}

export default QualityPromiseHeading;
