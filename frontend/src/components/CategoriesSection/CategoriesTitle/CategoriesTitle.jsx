import SectionHeading from '../../Utils/SectionHeading/SectionHeading';
import styles from './CategoriesTitle.module.css';

/**
 * CategoriesTitle
 *
 * Renders the category discovery title with its dedicated typography.
 */
function CategoriesTitle({ children = 'A craving for every mood' }) {
  return (
    <SectionHeading id="categories-heading" className={styles.title}>
      {children}
    </SectionHeading>
  );
}

export default CategoriesTitle;
