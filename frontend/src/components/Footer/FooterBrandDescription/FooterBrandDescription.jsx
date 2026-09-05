import { useContent } from '../../../hooks/data/useContent';
import styles from './FooterBrandDescription.module.css';

/**
 * FooterBrandDescription
 *
 * Renders supporting copy for the site footer experience with consistent typography.
 */
function FooterBrandDescription() {
  const { content } = useContent('footer');

  return (
    <p className={styles.description}>
      {content?.brandDescription || 'Fresh comfort food, bold flavor, and good moments—made the BiteX way.'}
    </p>
  );
}

export default FooterBrandDescription;
