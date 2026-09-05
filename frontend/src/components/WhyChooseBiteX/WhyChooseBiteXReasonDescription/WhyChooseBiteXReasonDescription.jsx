import styles from './WhyChooseBiteXReasonDescription.module.css';

/**
 * WhyChooseBiteXReasonDescription
 *
 * Renders supporting copy for the brand differentiators experience with consistent
 * typography.
 */
function WhyChooseBiteXReasonDescription({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default WhyChooseBiteXReasonDescription;
