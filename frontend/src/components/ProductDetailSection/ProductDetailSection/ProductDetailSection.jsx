import ProductDetailAddons from '../ProductDetailAddons/ProductDetailAddons';
import ProductDetailAddToCartButton from '../ProductDetailAddToCartButton/ProductDetailAddToCartButton';
import ProductDetailContentPanel from '../ProductDetailContentPanel/ProductDetailContentPanel';
import ProductDetailDescription from '../ProductDetailDescription/ProductDetailDescription';
import ProductDetailGallery from '../ProductDetailGallery/ProductDetailGallery';
import ProductDetailGalleryPanel from '../ProductDetailGalleryPanel/ProductDetailGalleryPanel';
import ProductDetailInformation from '../ProductDetailInformation/ProductDetailInformation';
import ProductDetailIngredients from '../ProductDetailIngredients/ProductDetailIngredients';
import ProductDetailLayout from '../ProductDetailLayout/ProductDetailLayout';
import ProductDetailOrderSummary from '../ProductDetailOrderSummary/ProductDetailOrderSummary';
import ProductDetailPricing from '../ProductDetailPricing/ProductDetailPricing';
import ProductDetailQuantitySelector from '../ProductDetailQuantitySelector/ProductDetailQuantitySelector';
import ProductDetailReviews from '../ProductDetailReviews/ProductDetailReviews';
import ProductDetailSpecialInstructions from '../ProductDetailSpecialInstructions/ProductDetailSpecialInstructions';
import ProductDetailTitle from '../ProductDetailTitle/ProductDetailTitle';
import ProductDetailVariations from '../ProductDetailVariations/ProductDetailVariations';
import WishlistHeartButton from '../../Wishlist/WishlistHeartButton/WishlistHeartButton';

/**
 * ProductDetailSection
 *
 * Composes the controlled product configuration view; all order state and derived
 * pricing remain owned by the route.
 */
function ProductDetailSection({
  product,
  price,
  selections,
  selectedAddons,
  specialInstructions,
  quantity,
  addonsTotal,
  total,
  canAddToCart,
  onVariationChange,
  onAddonChange,
  onInstructionsChange,
  onQuantityChange,
  onAddToCart,
}) {
  return (
    <ProductDetailLayout>
      <ProductDetailGalleryPanel>
        <ProductDetailGallery images={product.images} title={product.title} />
        <WishlistHeartButton productId={product._id} />
      </ProductDetailGalleryPanel>

      <ProductDetailContentPanel>
        <ProductDetailTitle>{product.title}</ProductDetailTitle>
        <ProductDetailDescription>
          {product.longDescription}
        </ProductDetailDescription>
        <ProductDetailInformation product={product} />
        <ProductDetailIngredients ingredients={product.ingredients} />
        <ProductDetailPricing price={price} />
        {product.variations.length > 0 && (
          <ProductDetailVariations
            variations={product.variations}
            selections={selections}
            onChange={onVariationChange}
          />
        )}
        {product.addons.length > 0 && (
          <ProductDetailAddons
            addons={product.addons}
            selectedAddons={selectedAddons}
            onChange={onAddonChange}
          />
        )}
        <ProductDetailSpecialInstructions
          value={specialInstructions}
          onChange={onInstructionsChange}
        />
        <ProductDetailQuantitySelector
          quantity={quantity}
          onChange={onQuantityChange}
        />
        <ProductDetailOrderSummary
          unitPrice={price.discountedPrice}
          addonsTotal={addonsTotal}
          quantity={quantity}
          total={total}
          selections={selections}
          selectedAddons={selectedAddons}
          specialInstructions={specialInstructions}
        />
        <ProductDetailAddToCartButton
          productId={product._id}
          selections={selections}
          selectedAddons={selectedAddons}
          specialInstructions={specialInstructions}
          quantity={quantity}
          total={total}
          disabled={!canAddToCart}
          available={product.available}
          onAddToCart={onAddToCart}
        />
        {product.ratings.reviews.length > 0 && (
          <ProductDetailReviews reviews={product.ratings.reviews} />
        )}
      </ProductDetailContentPanel>
    </ProductDetailLayout>
  );
}

export default ProductDetailSection;
