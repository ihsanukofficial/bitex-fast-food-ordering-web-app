import styles from './BiteXStoryDescription.module.css';

/**
 * BiteXStoryDescription
 *
 * Renders supporting copy for the BiteX story experience with consistent typography.
 */
function BiteXStoryDescription() {
  return (
    <p className={styles.description}>
      BiteX was built for people who want more from every meal. We bring
      together crowd-favorite comfort food, bold recipes, and quick service
      under one roof—so every craving has a delicious answer.
    </p>
  );
}

export default BiteXStoryDescription;
