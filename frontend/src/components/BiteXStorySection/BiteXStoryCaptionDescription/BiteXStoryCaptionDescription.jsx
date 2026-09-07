import styles from './BiteXStoryCaptionDescription.module.css';

/**
 * BiteXStoryCaptionDescription
 *
 * Renders supporting copy for the BiteX story experience with consistent typography.
 */
function BiteXStoryCaptionDescription({ children = 'Served fast. Remembered longer.' }) {
  return <span className={styles.description}>{children}</span>;
}

export default BiteXStoryCaptionDescription;
