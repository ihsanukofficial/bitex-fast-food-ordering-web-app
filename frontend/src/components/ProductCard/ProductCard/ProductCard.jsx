import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { toCartId } from '../../../utils/cartConstants';
import WishlistHeartButton from '../../Wishlist/WishlistHeartButton/WishlistHeartButton';
import ProductCardAddToCartButton from '../ProductCardAddToCartButton/ProductCardAddToCartButton';
import ProductCardBadge from '../ProductCardBadge/ProductCardBadge';
import ProductCardContent from '../ProductCardContent/ProductCardContent';
import ProductCardDescription from '../ProductCardDescription/ProductCardDescription';
import ProductCardDetailLink from '../ProductCardDetailLink/ProductCardDetailLink';
import ProductCardFooter from '../ProductCardFooter/ProductCardFooter';
import ProductCardHeader from '../ProductCardHeader/ProductCardHeader';
import ProductCardImage from '../ProductCardImage/ProductCardImage';
import ProductCardImageFrame from '../ProductCardImageFrame/ProductCardImageFrame';
import ProductCardInfo from '../ProductCardInfo/ProductCardInfo';
import ProductCardMedia from '../ProductCardMedia/ProductCardMedia';
import ProductCardPricing from '../ProductCardPricing/ProductCardPricing';
import ProductCardPurchaseMeta from '../ProductCardPurchaseMeta/ProductCardPurchaseMeta';
import ProductCardRating from '../ProductCardRating/ProductCardRating';
import ProductCardShell from '../ProductCardShell/ProductCardShell';
import ProductCardTitle from '../ProductCardTitle/ProductCardTitle';
import ProductCardVariationStatus from '../ProductCardVariationStatus/ProductCardVariationStatus';

/**
 * ProductCard
 *
 * Presents catalog product data and supplies default variation selections when adding
 * directly from a listing. One per row (see MenuProductsGrid) gives this a full-width
 * row's worth of space, used as three regions — a square image, a details column
 * (title + rating on one line, a capped description, then tags), and price + the
 * add-to-cart action as their own column — rather than a tall stack where each piece
 * claims a full row of its own. Narrower than ~700px (ProductCardShell), there isn't
 * room for that third column, so price/action drops to its own full-width row
 * underneath instead — see ProductCardFooter.
 */
function ProductCard({
  productId,
  slug,
  image = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  title = 'American Burger',
  description = 'Classic American-style beef patty with cheddar cheese, crisp lettuce, fresh tomato, pickles, and signature sauce.',
  currentPrice = 'Rs. 649',
  originalPrice,
  rating = 4.8,
  reviewCount = 24,
  preparationTime,
  spiceLevel,
  variations = [],
  badges = [],
  onAddToCart,
}) {
  const { addProduct } = useCart();
  const navigate = useNavigate();
  // Quick-add cannot prompt for a required choice, so those products must be configured
  // on the detail page instead of guessing an option that may not match currentPrice.
  const hasRequiredVariation = variations.some((variation) => variation.required);

  const handleAddToCart = () => {
    if (hasRequiredVariation) {
      if (slug) navigate(`/productdetail/${slug}`);
      return;
    }

    const defaultVariations = variations.flatMap((variation) => {
      const defaultOption = variation.options?.[0];
      return defaultOption
        ? [
            {
              variationId: toCartId(variation.name),
              optionId: toCartId(defaultOption.label),
            },
          ]
        : [];
    });

    addProduct({
      productId,
      productName: title,
      variations: defaultVariations,
      quantity: 1,
    })
      .then(() => onAddToCart?.())
      .catch(() => {});
  };

  return (
    <ProductCardShell>
      <ProductCardDetailLink slug={slug} title={title} />
      <ProductCardMedia>
        <ProductCardImageFrame>
          <ProductCardImage src={image} alt={title} />
        </ProductCardImageFrame>
        <ProductCardBadge badges={badges} />
        <WishlistHeartButton productId={productId} />
      </ProductCardMedia>
      <ProductCardContent>
        <ProductCardHeader>
          <ProductCardTitle>{title}</ProductCardTitle>
          <ProductCardRating rating={rating} reviewCount={reviewCount} />
        </ProductCardHeader>
        <ProductCardDescription>{description}</ProductCardDescription>
        <ProductCardPurchaseMeta>
          <ProductCardVariationStatus
            variationNames={variations.map((variation) => variation.name)}
          />
          <ProductCardInfo preparationTime={preparationTime} spiceLevel={spiceLevel} />
        </ProductCardPurchaseMeta>
      </ProductCardContent>
      <ProductCardFooter>
        <ProductCardPricing
          currentPrice={currentPrice}
          originalPrice={originalPrice}
        />
        <ProductCardAddToCartButton
          onClick={handleAddToCart}
          label={hasRequiredVariation ? 'Select Options' : 'Add to Cart'}
        />
      </ProductCardFooter>
    </ProductCardShell>
  );
}

export default ProductCard;
