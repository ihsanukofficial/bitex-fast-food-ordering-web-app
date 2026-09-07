import Container from '../../Utils/Container/Container';
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
            <CategoriesEyebrow>{content?.eyebrow}</CategoriesEyebrow>
            <CategoriesTitle>{content?.title}</CategoriesTitle>
            <CategoriesSubtitle>{content?.subtitle}</CategoriesSubtitle>
          </CategoriesHeader>
          <CategoriesCarousel categories={categories} />
        </CategoriesContent>
      </Container>
    </CategoriesBackground>
  );
}

export default CategoriesSection;
