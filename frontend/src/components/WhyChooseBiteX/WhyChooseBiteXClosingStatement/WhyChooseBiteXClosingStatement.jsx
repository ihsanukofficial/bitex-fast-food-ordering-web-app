import styles from './WhyChooseBiteXClosingStatement.module.css';

/**
 * WhyChooseBiteXClosingStatement
 *
 * Provides the closing statement that completes the brand differentiators narrative.
 */
function WhyChooseBiteXClosingStatement({ children }) {
  return <p className={styles.statement}>{children}</p>;
}

export default WhyChooseBiteXClosingStatement;
