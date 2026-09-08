import Container from '../../Utils/Container/Container';
import EditableText from '../../Utils/Editable/EditableText';
import CategoriesBackground from '../CategoriesBackground/CategoriesBackground';
import CategoriesCarousel from '../CategoriesCarousel/CategoriesCarousel';
import CategoriesContent from '../CategoriesContent/CategoriesContent';
import CategoriesEyebrow from '../CategoriesEyebrow/CategoriesEyebrow';
import CategoriesHeader from '../CategoriesHeader/CategoriesHeader';
import CategoriesSubtitle from '../CategoriesSubtitle/CategoriesSubtitle';
import CategoriesTitle from '../CategoriesTitle/CategoriesTitle';

/**
 * CategoriesSection
 *
 * Builds category navigation from catalog metadata so availability counts and routes
 * stay aligned.
 */
function CategoriesSection({ categories, content }) {
  return (
    <CategoriesBackground>
      <Container>
        <CategoriesContent>
          <CategoriesHeader>
            <CategoriesEyebrow>
              <EditableText page="home" path={['categoriesSection', 'eyebrow']} value={content?.eyebrow} />
            </CategoriesEyebrow>
            <CategoriesTitle>
              <EditableText page="home" path={['categoriesSection', 'title']} value={content?.title} />
            </CategoriesTitle>
            <CategoriesSubtitle>
              <EditableText page="home" path={['categoriesSection', 'subtitle']} value={content?.subtitle} />
            </CategoriesSubtitle>
          </CategoriesHeader>
          <CategoriesCarousel categories={categories} />
        </CategoriesContent>
      </Container>
    </CategoriesBackground>
  );
}

export default CategoriesSection;
