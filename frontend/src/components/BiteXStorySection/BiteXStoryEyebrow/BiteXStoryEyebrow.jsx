import styles from './BiteXStoryEyebrow.module.css';

/**
 * BiteXStoryEyebrow
 *
 * Renders the compact contextual label that introduces the BiteX story content.
 */
function BiteXStoryEyebrow({ children = 'Our story' }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default BiteXStoryEyebrow;
