import styles from './WhyChooseBiteXReasonContent.module.css';

/**
 * WhyChooseBiteXReasonContent
 *
 * Keeps brand differentiators content layout separate from stateful orchestration.
 */
function WhyChooseBiteXReasonContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default WhyChooseBiteXReasonContent;
