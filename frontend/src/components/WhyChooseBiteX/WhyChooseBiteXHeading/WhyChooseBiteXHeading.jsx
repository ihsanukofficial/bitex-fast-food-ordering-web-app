import styles from './WhyChooseBiteXHeading.module.css';

/**
 * WhyChooseBiteXHeading
 *
 * Renders the semantic heading for the brand differentiators experience with
 * feature-specific presentation.
 */
function WhyChooseBiteXHeading({ children }) {
  return (
    <h2 id="why-choose-bitex-heading" className={styles.heading}>
      {children}
    </h2>
  );
}

export default WhyChooseBiteXHeading;
