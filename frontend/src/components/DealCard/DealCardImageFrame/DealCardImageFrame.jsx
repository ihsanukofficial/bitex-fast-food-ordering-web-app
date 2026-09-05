import styles from './DealCardImageFrame.module.css';

/**
 * DealCardImageFrame
 *
 * Provides the clipping and positioning boundary for the deal card image.
 */
function DealCardImageFrame({ children }) {
  return <div className={styles.frame}>{children}</div>;
}

export default DealCardImageFrame;
