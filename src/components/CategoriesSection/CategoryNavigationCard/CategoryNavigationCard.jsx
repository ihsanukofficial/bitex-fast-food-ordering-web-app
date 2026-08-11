import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../utils/routeLoaders';
import CategoryCardArrow from '../CategoryCardArrow/CategoryCardArrow';
import CategoryCardAvailability from '../CategoryCardAvailability/CategoryCardAvailability';
import CategoryCardDetails from '../CategoryCardDetails/CategoryCardDetails';
import CategoryCardImage from '../CategoryCardImage/CategoryCardImage';
import CategoryCardText from '../CategoryCardText/CategoryCardText';
import CategoryCardTitle from '../CategoryCardTitle/CategoryCardTitle';
import CategoryCardVisual from '../CategoryCardVisual/CategoryCardVisual';
import styles from './CategoryNavigationCard.module.css';

/**
 * CategoryNavigationCard
 *
 * Links a catalog category to its filtered menu while presenting current availability.
 */
function CategoryNavigationCard({ category }) {
  const itemLabel = category.itemCount === 1 ? 'item' : 'items';

  return (
    <Link
      className={styles.card}
      to={category.to}
      data-category-card
      aria-label={`Explore ${category.name}: ${category.itemCount} ${itemLabel} available`}
      onPointerEnter={() => preloadRoute(category.to)}
      onFocus={() => preloadRoute(category.to)}
    >
      <CategoryCardVisual>
        <CategoryCardImage src={category.image} />
      </CategoryCardVisual>

      <CategoryCardDetails>
        <CategoryCardText>
          <CategoryCardTitle>{category.name}</CategoryCardTitle>
          <CategoryCardAvailability
            itemCount={category.itemCount}
            itemLabel={itemLabel}
          />
        </CategoryCardText>
        <CategoryCardArrow />
      </CategoryCardDetails>
    </Link>
  );
}

export default CategoryNavigationCard;
