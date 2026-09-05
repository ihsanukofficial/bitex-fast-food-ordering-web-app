import styles from './MissionValueDescription.module.css';

/**
 * MissionValueDescription
 *
 * Renders supporting copy for the brand mission experience with consistent typography.
 */
function MissionValueDescription({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default MissionValueDescription;
