import SectionHeading from '../../Utils/SectionHeading/SectionHeading';
import styles from './PopularItemsHeading.module.css';

/**
 * PopularItemsHeading
 *
 * Renders the semantic heading for the popular items experience with feature-specific
 * presentation.
 */
function PopularItemsHeading() {
  return (
    <SectionHeading
      id="popular-items-heading"
      className={styles.heading}
    >
      Popular right now
    </SectionHeading>
  );
}

export default PopularItemsHeading;
