import ProductDetailOrderSummaryAddonValue from '../ProductDetailOrderSummaryAddonValue/ProductDetailOrderSummaryAddonValue';
import ProductDetailOrderSummaryHeader from '../ProductDetailOrderSummaryHeader/ProductDetailOrderSummaryHeader';
import ProductDetailOrderSummaryList from '../ProductDetailOrderSummaryList/ProductDetailOrderSummaryList';
import ProductDetailOrderSummaryRow from '../ProductDetailOrderSummaryRow/ProductDetailOrderSummaryRow';
import ProductDetailOrderSummaryShell from '../ProductDetailOrderSummaryShell/ProductDetailOrderSummaryShell';

/**
 * ProductDetailOrderSummary
 *
 * Derives readable variation, add-on, instruction, and total rows from the current
 * controlled order configuration.
 */
function ProductDetailOrderSummary({
  unitPrice,
  addonsTotal,
  quantity,
  total,
  selections,
  selectedAddons,
  specialInstructions,
}) {
  const variationSelections = Object.entries(selections);

  return (
    <ProductDetailOrderSummaryShell>
      <ProductDetailOrderSummaryHeader />
      <ProductDetailOrderSummaryList>
        <ProductDetailOrderSummaryRow label="Base price">
          Rs. {unitPrice.toLocaleString('en-PK')}
        </ProductDetailOrderSummaryRow>

        {variationSelections.map(([variation, option]) => (
          <ProductDetailOrderSummaryRow
            key={variation}
            label={variation}
            isMissing={!option}
          >
            {option || 'Select an option'}
          </ProductDetailOrderSummaryRow>
        ))}

        {selectedAddons.length > 0 && (
          <ProductDetailOrderSummaryRow label="Add-ons">
            <ProductDetailOrderSummaryAddonValue
              selectedAddons={selectedAddons}
              addonsTotal={addonsTotal}
            />
          </ProductDetailOrderSummaryRow>
        )}

        {specialInstructions.trim() && (
          <ProductDetailOrderSummaryRow label="Instructions">
            {specialInstructions.trim()}
          </ProductDetailOrderSummaryRow>
        )}

        <ProductDetailOrderSummaryRow label="Quantity">
          {quantity}
        </ProductDetailOrderSummaryRow>

        <ProductDetailOrderSummaryRow label="Total" isTotal>
          Rs. {total.toLocaleString('en-PK')}
        </ProductDetailOrderSummaryRow>
      </ProductDetailOrderSummaryList>
    </ProductDetailOrderSummaryShell>
  );
}

export default ProductDetailOrderSummary;
