import styles from './MissionDescription.module.css';

/**
 * MissionDescription
 *
 * Renders supporting copy for the brand mission experience with consistent typography.
 */
function MissionDescription() {
  return (
    <p className={styles.description}>
      Our mission is to serve crave-worthy food with the speed people need and
      the care they deserve. Every BiteX order should feel easy, exciting, and
      worth coming back for.
    </p>
  );
}

export default MissionDescription;
