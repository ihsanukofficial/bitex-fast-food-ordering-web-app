import heroHighlights from '../../../data/heroHighlights';
import styles from './HeroHighlights.module.css';

/**
 * HeroHighlights
 *
 * Builds the concise homepage hero highlights from shared content definitions.
 */
function HeroHighlights() {
  return (
    <div className={styles.highlights} aria-label="BiteX highlights">
      {heroHighlights.map((highlight) => (
        <span key={highlight}>{highlight}</span>
      ))}
    </div>
  );
}

export default HeroHighlights;
