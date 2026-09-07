import styles from './QualityPromiseNoteDescription.module.css';

/**
 * QualityPromiseNoteDescription
 *
 * Renders supporting copy for the quality promise experience with consistent
 * typography.
 */
function QualityPromiseNoteDescription({ children = 'Quality you can see in every layer' }) {
  return <span className={styles.description}>{children}</span>;
}

export default QualityPromiseNoteDescription;
