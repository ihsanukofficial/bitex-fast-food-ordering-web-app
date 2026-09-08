import { EditableHighlightedText } from '../../Utils/Editable/EditableText';
import SectionHeading from '../../Utils/SectionHeading/SectionHeading';
import styles from './CallToActionHeading.module.css';

/**
 * CallToActionHeading
 *
 * Renders the semantic heading for the call-to-action experience with feature-specific
 * presentation. The *asterisk*-wrapped word (see HighlightedText) is what admins move
 * via the Site Content editor or the live visual editor instead of code.
 */
function CallToActionHeading({ children = 'Ready for Your Next *Delicious* Bite?' }) {
  return (
    <SectionHeading
      id="call-to-action-heading"
      className={styles.heading}
    >
      <EditableHighlightedText page="home" path={['cta', 'heading']} value={children} />
    </SectionHeading>
  );
}

export default CallToActionHeading;
