/**
 * Brand-story statistics derived from shared catalog and category sources.
 */
import categories from './categories.js';

const biteXStoryStats = [
  { value: '100%', label: 'Made to order' },
  { value: String(categories.length), label: 'Food categories' },
  { value: '1', label: 'Promise: great taste' },
];

export default biteXStoryStats;
