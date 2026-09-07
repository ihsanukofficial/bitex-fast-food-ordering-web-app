import styles from './MissionEyebrow.module.css';

/**
 * MissionEyebrow
 *
 * Renders the compact contextual label that introduces the brand mission content.
 */
function MissionEyebrow({ children = 'Our mission' }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default MissionEyebrow;
