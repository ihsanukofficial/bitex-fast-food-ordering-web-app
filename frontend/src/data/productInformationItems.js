/**
 * Shared product metadata definitions and adapters for card and detail presentations.
 */
const productInformationFields = {
  preparation: {
    icon: 'ri-time-line',
    label: 'Preparation',
  },
  calories: {
    icon: 'ri-fire-line',
    label: 'Calories',
  },
  spiceLevel: {
    icon: 'ri-fire-fill',
    label: 'Spice level',
  },
  allergens: {
    icon: 'ri-alert-line',
    label: 'Allergens',
  },
};

/**
 * Builds the compact metadata subset appropriate for product cards.
 */
export const createProductCardInfoItems = ({
  preparationTime,
  spiceLevel,
}) =>
  [
    preparationTime && {
      ...productInformationFields.preparation,
      value: preparationTime,
    },
    spiceLevel !== undefined && {
      ...productInformationFields.spiceLevel,
      value: `${spiceLevel}/5`,
    },
  ].filter(Boolean);

/**
 * Builds available preparation, nutrition, spice, and allergen rows for product details.
 */
export const createProductDetailInformationItems = (product) =>
  [
    product.preparationTime && {
      ...productInformationFields.preparation,
      value: product.preparationTime,
    },
    product.nutrition?.calories && {
      ...productInformationFields.calories,
      value: `${product.nutrition.calories} kcal`,
    },
    product.spiceLevel !== undefined && {
      ...productInformationFields.spiceLevel,
      value: `${product.spiceLevel}/5`,
    },
    product.allergens?.length > 0 && {
      ...productInformationFields.allergens,
      value: product.allergens.join(', '),
    },
  ].filter(Boolean);

export default productInformationFields;
