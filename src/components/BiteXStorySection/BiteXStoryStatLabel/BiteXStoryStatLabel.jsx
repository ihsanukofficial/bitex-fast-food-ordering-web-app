import styles from './BiteXStoryStatLabel.module.css';

/**
 * BiteXStoryStatLabel
 *
 * Renders the semantic label used by the BiteX story presentation.
 */
function BiteXStoryStatLabel({ children }) {
  return <dd className={styles.label}>{children}</dd>;
}

export default BiteXStoryStatLabel;
