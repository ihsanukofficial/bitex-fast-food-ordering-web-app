import Container from '../../Utils/Container/Container';
import EditableText from '../../Utils/Editable/EditableText';
import useProductDetailRoutePreload from '../../../hooks/useProductDetailRoutePreload';
import PopularItemsBackground from '../PopularItemsBackground/PopularItemsBackground';
import PopularItemsEyebrow from '../PopularItemsEyebrow/PopularItemsEyebrow';
import PopularItemsGrid from '../PopularItemsGrid/PopularItemsGrid';
import PopularItemsHeader from '../PopularItemsHeader/PopularItemsHeader';
import PopularItemsHeading from '../PopularItemsHeading/PopularItemsHeading';
import PopularItemsSubtitle from '../PopularItemsSubtitle/PopularItemsSubtitle';

/**
 * PopularItems
 *
 * Composes the curated popular-items section from centralized product references and
 * reusable presentation primitives.
 */
const PopularItems = ({ content }) => {
  useProductDetailRoutePreload();

  return (
    <PopularItemsBackground>
      <Container>
        <PopularItemsHeader>
          <PopularItemsEyebrow>
            <EditableText page="home" path={['popularItems', 'eyebrow']} value={content?.eyebrow} />
          </PopularItemsEyebrow>
          <PopularItemsHeading>
            <EditableText page="home" path={['popularItems', 'heading']} value={content?.heading} />
          </PopularItemsHeading>
          <PopularItemsSubtitle>
            <EditableText page="home" path={['popularItems', 'subtitle']} value={content?.subtitle} />
          </PopularItemsSubtitle>
        </PopularItemsHeader>
        <PopularItemsGrid items={content?.items || []} />
      </Container>
    </PopularItemsBackground>
  );
};

export default PopularItems;
