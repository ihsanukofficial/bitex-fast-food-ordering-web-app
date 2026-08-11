import styles from './FooterBackground.module.css';

/**
 * FooterBackground
 *
 * Isolates the decorative backdrop used by the site footer experience from its
 * semantic content.
 */
function FooterBackground({ children, footerRef }) {
  return <footer ref={footerRef} className={styles.background}>{children}</footer>;
}

export default FooterBackground;
