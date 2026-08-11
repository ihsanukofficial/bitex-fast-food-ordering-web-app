import Icon from '../../Utils/Icon/Icon';
import styles from './ProductCardVariationStatus.module.css';

/**
 * Pluralizes the final word without modifying the rest of a variation label.
 */
const pluralizeLastWord = (label) =>
  label.replace(/([a-z]+)$/i, (word) => {
    if (/s$/i.test(word)) return word;
    if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
    return `${word}s`;
  });

/**
 * Formats variation names as a natural-language list for compact card guidance.
 */
const formatVariationList = (variationNames) => {
  if (variationNames.length === 2) {
    return `${variationNames[0]} and ${variationNames[1]}`;
  }

  return `${variationNames.slice(0, -1).join(', ')}, and ${
    variationNames.at(-1)
  }`;
};

/**
 * Produces the user-facing configuration summary for unique variation names.
 */
function getVariationLabel(variationNames) {
  const uniqueNames = [...new Set(variationNames.filter(Boolean))];

  if (uniqueNames.length === 0) return 'No variations';
  if (uniqueNames.length === 1) {
    return `${pluralizeLastWord(uniqueNames[0])} available`;
  }

  return `${formatVariationList(uniqueNames)} options available`;
}

/**
 * ProductCardVariationStatus
 *
 * Summarizes configurable variation names into concise catalog-card guidance without
 * duplicating selectors.
 */
function ProductCardVariationStatus({ variationNames = [] }) {
  const hasVariations = variationNames.length > 0;

  return (
    <span className={styles.status}>
      <Icon
        name={hasVariations ? 'ri-equalizer-2-line' : 'ri-subtract-line'}
        size="0.9rem"
        ariaLabel=""
      />
      {getVariationLabel(variationNames)}
    </span>
  );
}

export default ProductCardVariationStatus;
