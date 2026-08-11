import RedStyleText from '../../Utils/RedStyleText/RedStyleText';
import SectionHeading from '../../Utils/SectionHeading/SectionHeading';
import styles from './CallToActionHeading.module.css';

/**
 * CallToActionHeading
 *
 * Renders the semantic heading for the call-to-action experience with feature-specific
 * presentation.
 */
function CallToActionHeading() {
  return (
    <SectionHeading
      id="call-to-action-heading"
      className={styles.heading}
    >
      Ready for Your Next <RedStyleText>Delicious</RedStyleText> Bite?
    </SectionHeading>
  );
}

export default CallToActionHeading;
