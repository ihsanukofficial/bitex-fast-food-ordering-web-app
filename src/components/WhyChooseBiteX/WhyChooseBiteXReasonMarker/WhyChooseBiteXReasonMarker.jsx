import Icon from '../../Utils/Icon/Icon';
import styles from './WhyChooseBiteXReasonMarker.module.css';

/**
 * WhyChooseBiteXReasonMarker
 *
 * Provides a decorative cue that improves scanning within the brand differentiators
 * experience.
 */
function WhyChooseBiteXReasonMarker() {
  return (
    <span className={styles.marker} aria-hidden="true">
      <Icon name="ri-check-line" size="1rem" ariaLabel="" />
    </span>
  );
}

export default WhyChooseBiteXReasonMarker;
