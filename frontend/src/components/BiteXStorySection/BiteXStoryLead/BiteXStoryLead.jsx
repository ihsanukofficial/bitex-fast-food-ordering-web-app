import styles from './BiteXStoryLead.module.css';

/**
 * BiteXStoryLead
 *
 * Provides the lead-in statement that establishes the BiteX story narrative.
 */
function BiteXStoryLead({ children = 'Make fast food feel fresh, generous, and genuinely satisfying.' }) {
  return <p className={styles.lead}>{children}</p>;
}

export default BiteXStoryLead;
