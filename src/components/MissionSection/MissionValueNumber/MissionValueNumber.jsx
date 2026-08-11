import styles from './MissionValueNumber.module.css';

/**
 * MissionValueNumber
 *
 * Renders a formatted value within the brand mission presentation.
 */
function MissionValueNumber({ children }) {
  return (
    <span className={styles.number} aria-hidden="true">
      {children}
    </span>
  );
}

export default MissionValueNumber;
