import styles from './WhyChooseBiteXReasonTitle.module.css';

/**
 * WhyChooseBiteXReasonTitle
 *
 * Renders the brand differentiators title with its dedicated typography.
 */
function WhyChooseBiteXReasonTitle({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default WhyChooseBiteXReasonTitle;
