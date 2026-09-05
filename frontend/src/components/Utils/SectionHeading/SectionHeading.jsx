import styles from './SectionHeading.module.css';

/**
 * SectionHeading
 *
 * Renders the semantic heading for the shared UI experience with feature-specific
 * presentation.
 */
const SectionHeading = ({ children, className = '', ...props }) => {
  return (
    <h2
      className={`${styles.sectionHeading} ${className}`.trim()}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
