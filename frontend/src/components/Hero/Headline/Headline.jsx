import { EditableHighlightedText } from '../../Utils/Editable/EditableText';
import styles from './Headline.module.css';

/**
 * Headline
 *
 * Provides the primary homepage promise as the hero section semantic heading. The
 * *asterisk*-wrapped word (see HighlightedText) is what admins move via the Site
 * Content editor or the live visual editor instead of code.
 */
const Headline = ({ children = 'The *Taste* You Remember.' }) => {
  return (
    <h1 className={styles.headline}>
      <EditableHighlightedText page="home" path={['hero', 'headline']} value={children} />
    </h1>
  );
};

export default Headline;
