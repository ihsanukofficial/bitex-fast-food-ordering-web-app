import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { toCartId } from '../../../utils/cartConstants';
import WishlistHeartButton from '../../Wishlist/WishlistHeartButton/WishlistHeartButton';
import ProductCardAddToCartButton from '../ProductCardAddToCartButton/ProductCardAddToCartButton';
import ProductCardContent from '../ProductCardContent/ProductCardContent';
import ProductCardDescription from '../ProductCardDescription/ProductCardDescription';
import ProductCardDetailLink from '../ProductCardDetailLink/ProductCardDetailLink';
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
 * directly from a listing.
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
        <WishlistHeartButton productId={productId} />
      </ProductCardMedia>
      <ProductCardContent>
        <ProductCardTitle>{title}</ProductCardTitle>
        <ProductCardDescription>{description}</ProductCardDescription>
        <ProductCardPricing
          currentPrice={currentPrice}
          originalPrice={originalPrice}
        />
        <ProductCardPurchaseMeta>
          <ProductCardRating rating={rating} reviewCount={reviewCount} />
          <ProductCardVariationStatus
            variationNames={variations.map((variation) => variation.name)}
          />
        </ProductCardPurchaseMeta>
        <ProductCardInfo
          preparationTime={preparationTime}
          spiceLevel={spiceLevel}
        />
        <ProductCardAddToCartButton
          onClick={handleAddToCart}
          label={hasRequiredVariation ? 'Select Options' : 'Add to Cart'}
        />
      </ProductCardContent>
    </ProductCardShell>
  );
}

export default ProductCard;
