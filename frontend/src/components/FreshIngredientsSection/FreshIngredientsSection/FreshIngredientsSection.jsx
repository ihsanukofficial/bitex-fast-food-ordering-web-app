import Container from '../../Utils/Container/Container';
import FreshIngredientsImage from '../FreshIngredientsImage/FreshIngredientsImage';
import FreshIngredientsContent from '../FreshIngredientsContent/FreshIngredientsContent';
import styles from './FreshIngredientsSection.module.css';

/**
 * FreshIngredientsSection
 *
 * Assembles the fresh-ingredients section from focused content and presentation
 * primitives.
 */
function FreshIngredientsSection({ content }) {
  return (
    <section className={styles.section} aria-labelledby="ingredients-heading">
      <Container>
        <div className={styles.wrapper}>
          <FreshIngredientsImage />
          <FreshIngredientsContent highlights={content?.highlights} />
        </div>
      </Container>
    </section>
  );
}

export default FreshIngredientsSection;
