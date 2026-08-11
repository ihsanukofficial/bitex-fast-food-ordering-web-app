import { useId, useState } from 'react';
import ProductDetailIngredientsHeader from '../ProductDetailIngredientsHeader/ProductDetailIngredientsHeader';
import ProductDetailIngredientsList from '../ProductDetailIngredientsList/ProductDetailIngredientsList';
import ProductDetailIngredientsPanel from '../ProductDetailIngredientsPanel/ProductDetailIngredientsPanel';
import ProductDetailIngredientsShell from '../ProductDetailIngredientsShell/ProductDetailIngredientsShell';
import ProductDetailIngredientsTrigger from '../ProductDetailIngredientsTrigger/ProductDetailIngredientsTrigger';

/**
 * ProductDetailIngredients
 *
 * Owns the accessible disclosure state for ingredient details and omits the control
 * when no ingredients exist.
 */
function ProductDetailIngredients({ ingredients }) {
  const [isOpen, setIsOpen] = useState(false);
  const reactId = useId();
  const panelId = `ingredients-panel-${reactId.replace(/:/g, '')}`;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return null;
  }

  return (
    <ProductDetailIngredientsShell isOpen={isOpen}>
      <ProductDetailIngredientsHeader>
        <ProductDetailIngredientsTrigger
          isOpen={isOpen}
          panelId={panelId}
          onClick={() => setIsOpen((current) => !current)}
        />
      </ProductDetailIngredientsHeader>
      <ProductDetailIngredientsPanel panelId={panelId} isOpen={isOpen}>
        <ProductDetailIngredientsList ingredients={ingredients} />
      </ProductDetailIngredientsPanel>
    </ProductDetailIngredientsShell>
  );
}

export default ProductDetailIngredients;
