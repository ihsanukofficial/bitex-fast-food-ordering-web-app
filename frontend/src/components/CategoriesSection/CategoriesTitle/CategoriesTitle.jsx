import SectionHeading from '../../Utils/SectionHeading/SectionHeading';
import styles from './CategoriesTitle.module.css';

/**
 * CategoriesTitle
 *
 * Renders the category discovery title with its dedicated typography.
 */
function CategoriesTitle() {
  return (
    <SectionHeading id="categories-heading" className={styles.title}>
      A craving for every mood
    </SectionHeading>
  );
}

export default CategoriesTitle;
