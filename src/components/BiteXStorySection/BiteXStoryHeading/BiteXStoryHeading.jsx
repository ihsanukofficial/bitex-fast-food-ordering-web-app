import styles from './BiteXStoryHeading.module.css';

/**
 * BiteXStoryHeading
 *
 * Renders the semantic heading for the BiteX story experience with feature-specific
 * presentation.
 */
function BiteXStoryHeading() {
  return (
    <h1 id="bitex-story-heading" className={styles.heading}>
      Big flavor began with one simple idea
    </h1>
  );
}

export default BiteXStoryHeading;
