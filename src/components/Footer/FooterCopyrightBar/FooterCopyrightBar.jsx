import styles from './FooterCopyrightBar.module.css';

/**
 * FooterCopyrightBar
 *
 * Provides the legal ownership line at the close of the site footer.
 */
function FooterCopyrightBar() {
  return (
    <div className={styles.bar}>
      <p>
        © {new Date().getFullYear()} BiteX. All Rights Reserved. Made with love
        for food lovers.
      </p>
    </div>
  );
}

export default FooterCopyrightBar;
