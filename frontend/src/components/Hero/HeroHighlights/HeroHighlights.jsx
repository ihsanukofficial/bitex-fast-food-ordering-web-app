import styles from './HeroHighlights.module.css';

/**
 * HeroHighlights
 *
 * Builds the concise homepage hero highlights from shared content definitions.
 */
function HeroHighlights({ highlights = [] }) {
  return (
    <div className={styles.highlights} aria-label="BiteX highlights">
      {highlights.map((highlight) => (
        <span key={highlight}>{highlight}</span>
      ))}
    </div>
  );
}

export default HeroHighlights;
