import Container from '../../Utils/Container/Container';
import EditableImage from '../../Utils/Editable/EditableImage';
import EditableText from '../../Utils/Editable/EditableText';
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
          <EditableImage page="about" path={['freshIngredients', 'image']}>
            <FreshIngredientsImage image={content?.image} />
          </EditableImage>
          <FreshIngredientsContent
            eyebrow={
              <EditableText
                page="about"
                path={['freshIngredients', 'eyebrow']}
                value={content?.eyebrow || 'Fresh ingredients'}
              />
            }
            heading={
              <EditableText
                page="about"
                path={['freshIngredients', 'heading']}
                value={content?.heading || 'Better ingredients make every bite better'}
              />
            }
            description={
              <EditableText
                page="about"
                path={['freshIngredients', 'description']}
                value={
                  content?.description ||
                  'We choose ingredients for freshness, flavor, and the way they work together. Crisp vegetables, tender proteins, soft buns, and signature sauces are prepared to make each meal taste its best.'
                }
              />
            }
            closing={
              <EditableText
                page="about"
                path={['freshIngredients', 'closing']}
                value={content?.closing || 'No shortcuts. Just honest ingredients and full-on flavor.'}
              />
            }
            highlights={content?.highlights}
          />
        </div>
      </Container>
    </section>
  );
}

export default FreshIngredientsSection;
