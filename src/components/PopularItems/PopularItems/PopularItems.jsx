import Container from '../../Utils/Container/Container';
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
const PopularItems = () => {
  useProductDetailRoutePreload();

  return (
    <PopularItemsBackground>
      <Container>
        <PopularItemsHeader>
          <PopularItemsEyebrow />
          <PopularItemsHeading />
          <PopularItemsSubtitle />
        </PopularItemsHeader>
        <PopularItemsGrid />
      </Container>
    </PopularItemsBackground>
  );
};

export default PopularItems;
