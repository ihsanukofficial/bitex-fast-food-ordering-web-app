import HighlightedText from '../../Utils/HighlightedText/HighlightedText';
import styles from './Headline.module.css';

/**
 * Headline
 *
 * Provides the primary homepage promise as the hero section semantic heading. The
 * *asterisk*-wrapped word (see HighlightedText) is what admins move via the Site
 * Content editor instead of code.
 */
const Headline = ({ children = 'The *Taste* You Remember.' }) => {
  return (
    <h1 className={styles.headline}>
      <HighlightedText text={children} />
    </h1>
  );
};

export default Headline;
