import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../utils/routeLoaders';
import PopularItemArrow from '../PopularItemArrow/PopularItemArrow';
import PopularItemDetails from '../PopularItemDetails/PopularItemDetails';
import PopularItemImage from '../PopularItemImage/PopularItemImage';
import PopularItemTitle from '../PopularItemTitle/PopularItemTitle';
import PopularItemVisual from '../PopularItemVisual/PopularItemVisual';
import styles from './PopularItemCard.module.css';

/**
 * PopularItemCard
 *
 * Links one curated popular product to its canonical product-detail route. Inside
 * AdminLiveEditor (`disabled`) it renders the identical card as a non-navigating
 * `<div>` instead.
 */
const PopularItemCard = ({ src, alt = 'Popular item', label, to, className = '', disabled = false }) => {
  const content = (
    <>
      <PopularItemVisual>
        <PopularItemImage src={src} alt={alt} />
      </PopularItemVisual>
      <PopularItemDetails>
        <PopularItemTitle>{label}</PopularItemTitle>
        <PopularItemArrow />
      </PopularItemDetails>
    </>
  );

  if (disabled) {
    return <div className={`${styles.card} ${className}`.trim()}>{content}</div>;
  }

  return (
    <Link
      className={`${styles.card} ${className}`.trim()}
      to={to}
      aria-label={`View ${label} details`}
      onPointerEnter={() => preloadRoute(to)}
      onPointerDown={() => preloadRoute(to)}
      onFocus={() => preloadRoute(to)}
    >
      {content}
    </Link>
  );
};

export default PopularItemCard;
