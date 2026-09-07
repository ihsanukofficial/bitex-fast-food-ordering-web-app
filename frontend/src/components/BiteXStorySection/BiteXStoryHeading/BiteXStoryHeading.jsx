import styles from './BiteXStoryHeading.module.css';

/**
 * BiteXStoryHeading
 *
 * Renders the semantic heading for the BiteX story experience with feature-specific
 * presentation.
 */
function BiteXStoryHeading({ children = 'Big flavor began with one simple idea' }) {
  return (
    <h1 id="bitex-story-heading" className={styles.heading}>
      {children}
    </h1>
  );
}

export default BiteXStoryHeading;
