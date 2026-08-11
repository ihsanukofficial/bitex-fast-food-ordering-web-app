import styles from './WhyChooseBiteXContent.module.css';

/**
 * WhyChooseBiteXContent
 *
 * Keeps differentiator copy and reasons aligned within the section's content column.
 */
function WhyChooseBiteXContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default WhyChooseBiteXContent;
