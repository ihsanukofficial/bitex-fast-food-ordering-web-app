import { useContent } from '../../../hooks/data/useContent';
import EditableText from '../../Utils/Editable/EditableText';
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
      <EditableText
        page="footer"
        path={['brandDescription']}
        value={content?.brandDescription || 'Fresh comfort food, bold flavor, and good moments—made the BiteX way.'}
      />
    </p>
  );
}

export default FooterBrandDescription;
