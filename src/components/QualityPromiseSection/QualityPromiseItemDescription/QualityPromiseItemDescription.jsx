import styles from './QualityPromiseItemDescription.module.css';

/**
 * QualityPromiseItemDescription
 *
 * Renders supporting copy for the quality promise experience with consistent
 * typography.
 */
function QualityPromiseItemDescription({ children }) {
  return <small className={styles.description}>{children}</small>;
}

export default QualityPromiseItemDescription;
