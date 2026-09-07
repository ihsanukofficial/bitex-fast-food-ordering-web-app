import styles from './BiteXStoryCaptionTitle.module.css';

/**
 * BiteXStoryCaptionTitle
 *
 * Renders the BiteX story title with its dedicated typography.
 */
function BiteXStoryCaptionTitle({ children = 'Food that brings people together' }) {
  return <strong className={styles.title}>{children}</strong>;
}

export default BiteXStoryCaptionTitle;
