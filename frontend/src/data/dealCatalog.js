/**
 * Flat deal lookup derived from the grouped deals presentation model.
 */
import deals from './deals.js';

const dealCatalog = deals.flatMap((section) => section.deals);

export default dealCatalog;
