import styles from './HeroTextBlock.module.css';

/**
 * HeroTextBlock
 *
 * Groups the hero headline, supporting promise, and primary actions as one region.
 */
function HeroTextBlock({ children }) {
  return <div className={styles.textBlock}>{children}</div>;
}

export default HeroTextBlock;
