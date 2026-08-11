import styles from './FooterBrandDescription.module.css';

/**
 * FooterBrandDescription
 *
 * Renders supporting copy for the site footer experience with consistent typography.
 */
function FooterBrandDescription() {
  return (
    <p className={styles.description}>
      Fresh comfort food, bold flavor, and good moments—made the BiteX way.
    </p>
  );
}

export default FooterBrandDescription;
