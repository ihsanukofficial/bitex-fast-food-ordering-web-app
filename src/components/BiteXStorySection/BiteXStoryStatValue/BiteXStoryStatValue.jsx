import styles from './BiteXStoryStatValue.module.css';

/**
 * BiteXStoryStatValue
 *
 * Renders a formatted value within the BiteX story presentation.
 */
function BiteXStoryStatValue({ children }) {
  return <dt className={styles.value}>{children}</dt>;
}

export default BiteXStoryStatValue;
