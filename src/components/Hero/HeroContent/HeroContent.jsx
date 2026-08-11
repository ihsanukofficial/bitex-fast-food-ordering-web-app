import styles from './HeroContent.module.css';

/**
 * HeroContent
 *
 * Keeps homepage hero content layout separate from stateful orchestration.
 */
function HeroContent({ children }) {
  return <div className={styles.heroContent}>{children}</div>;
}

export default HeroContent;
