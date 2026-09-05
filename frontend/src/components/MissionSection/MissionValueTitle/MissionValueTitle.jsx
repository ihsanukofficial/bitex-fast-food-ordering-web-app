import styles from './MissionValueTitle.module.css';

/**
 * MissionValueTitle
 *
 * Renders the brand mission title with its dedicated typography.
 */
function MissionValueTitle({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default MissionValueTitle;
