import styles from './RedStyleText.module.css';

/**
 * RedStyleText
 *
 * Provides the styled text primitive used by the shared UI composition.
 */
const RedStyleText = ({ children, className = '' }) => {
  return (
    <span className={`${styles.redStyleText} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default RedStyleText;
