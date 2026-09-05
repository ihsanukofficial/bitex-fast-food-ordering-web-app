/**
 * Promotional deal collections, including section theming and purchasable deal records.
 * Each deal owns its bundled asset URL so cards and cart entries share the same image.
 *
 * `items` used to be free-text descriptions (e.g. "2 Zinger Burgers"). Deals are now
 * built from real catalog products + quantity instead: each entry here is a
 * `{ productSlug, quantity, variationSelections? }` tuple resolved against
 * src/data/catalog.js by the seed script (mirrors how popularItems resolves a slug to
 * a product). `variationSelections` (an array of `{ variationName, optionLabel }`
 * pairs) records which option of one of the product's own variations — e.g. pizza
 * "Size" — this deal bundles, so the storefront can say so instead of leaving
 * customers to guess; omit it for products with no variations, or where the deal
 * doesn't pin one down. Re-pick exact products/sizes anytime via the admin Deals editor.
 */
const deals = [
  {
    id: 'exclusive-deals',
    title: 'Exclusive Deals',
    navigationLabel: 'Exclusive',
    eyebrow: 'BiteX exclusives',
    icon: 'ri-vip-crown-2-fill',
    accent: '#c8191d',
    tint: '#fff0ef',
    navigationAccent: '#ff565a',
    deals: [
      {
        id: 'special-deal-1',
        name: 'Special Deal 1',
        image: new URL(
          '../assets/deals/Exclusive Deals/Special Deal 1.webp',
          import.meta.url,
        ).href,
        price: 2700,
        items: [
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: 'zinger-burger', quantity: 2 },
          { productSlug: '10-hot-wings', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1 L' }],
          },
        ],
      },
      {
        id: 'special-deal-2',
        name: 'Special Deal 2',
        image: new URL(
          '../assets/deals/Exclusive Deals/Special Deal 2.webp',
          import.meta.url,
        ).href,
        price: 3600,
        items: [
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: 'chicken-patty-burger', quantity: 2 },
          { productSlug: 'chicken-shawarma', quantity: 2 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1 L' }],
          },
        ],
      },
      {
        id: 'mega-special-deal',
        name: 'Mega Special Deal',
        image: new URL(
          '../assets/deals/Exclusive Deals/Mega Special Deal.webp',
          import.meta.url,
        ).href,
        price: 5000,
        items: [
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: '10-hot-wings', quantity: 1 },
          { productSlug: 'chicken-leg-piece', quantity: 2 },
          { productSlug: 'chicken-paratha-roll', quantity: 2 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1.5 L' }],
          },
        ],
      },
    ],
  },
  {
    id: 'family-deals',
    title: 'Family Deals',
    navigationLabel: 'Family',
    eyebrow: 'Made for sharing',
    icon: 'ri-group-fill',
    accent: '#9b6100',
    tint: '#fff7df',
    navigationAccent: '#f6b800',
    deals: [
      {
        id: 'family-deal-1',
        name: 'Family Deal 1',
        image: new URL(
          '../assets/deals/Family Deals/Family Deal 1.webp',
          import.meta.url,
        ).href,
        price: 3800,
        items: [
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Family (16")' }],
          },
          { productSlug: 'zinger-burger', quantity: 4 },
          { productSlug: 'chicken-leg-piece', quantity: 4 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '2.25 L' }],
          },
        ],
      },
      {
        id: 'family-deal-2',
        name: 'Family Deal 2',
        image: new URL(
          '../assets/deals/Family Deals/Family Deal 2.webp',
          import.meta.url,
        ).href,
        price: 4200,
        items: [
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Family (16")' }],
          },
          { productSlug: 'zinger-burger', quantity: 2 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '2.25 L' }],
          },
        ],
      },
    ],
  },
  {
    id: 'super-pizza-deals',
    title: 'Super Pizza Deals',
    navigationLabel: 'Super Pizza',
    eyebrow: 'Triple the pizza',
    icon: 'ri-restaurant-2-fill',
    accent: '#d94f16',
    tint: '#fff0e7',
    navigationAccent: '#ff7a32',
    deals: [
      {
        id: 'super-deal-1',
        name: 'Super Deal 1',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 1.webp',
          import.meta.url,
        ).href,
        price: 1900,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Small (7")' }],
          },
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Small (7")' }],
          },
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Small (7")' }],
          },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '500 ml' }],
          },
        ],
      },
      {
        id: 'super-deal-2',
        name: 'Super Deal 2',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 2.webp',
          import.meta.url,
        ).href,
        price: 3700,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
        ],
      },
      {
        id: 'super-deal-3',
        name: 'Super Deal 3',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 3.webp',
          import.meta.url,
        ).href,
        price: 4900,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Large (13")' }],
          },
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Large (13")' }],
          },
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Large (13")' }],
          },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1.5 L' }],
          },
        ],
      },
      {
        id: 'super-deal-4',
        name: 'Super Deal 4',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 4.webp',
          import.meta.url,
        ).href,
        price: 6200,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Family (16")' }],
          },
          {
            productSlug: 'chicken-bbq-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Family (16")' }],
          },
          {
            productSlug: 'chicken-tikka-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Family (16")' }],
          },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '2.25 L' }],
          },
        ],
      },
    ],
  },
  {
    id: 'big-deals',
    title: 'Big Deals',
    navigationLabel: 'Big Deals',
    eyebrow: 'Big appetite bundles',
    icon: 'ri-fire-fill',
    accent: '#4c3324',
    tint: '#f5efe9',
    navigationAccent: '#e7bd8d',
    deals: [
      {
        id: 'big-deal-1',
        name: 'Big Deal 1',
        image: new URL(
          '../assets/deals/Big Deals/Big Deal 1.webp',
          import.meta.url,
        ).href,
        price: 1500,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Small (7")' }],
          },
          { productSlug: 'zinger-burger', quantity: 1 },
          { productSlug: '5-hot-wings', quantity: 1 },
          { productSlug: 'small-fries', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '500 ml' }],
          },
        ],
      },
      {
        id: 'big-deal-2',
        name: 'Big Deal 2',
        image: new URL(
          '../assets/deals/Big Deals/Big Deal 2.webp',
          import.meta.url,
        ).href,
        price: 2100,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: '10-hot-wings', quantity: 1 },
          { productSlug: 'chicken-patty-burger', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1 L' }],
          },
        ],
      },
      {
        id: 'big-deal-3',
        name: 'Big Deal 3',
        image: new URL(
          '../assets/deals/Big Deals/Big Deal 3.webp',
          import.meta.url,
        ).href,
        price: 2600,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: 'zinger-burger', quantity: 3 },
          { productSlug: 'chicken-leg-piece', quantity: 2 },
          { productSlug: 'medium-fries', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1 L' }],
          },
        ],
      },
      {
        id: 'big-deal-4',
        name: 'Big Deal 4',
        image: new URL(
          '../assets/deals/Big Deals/Big Deal 4.webp',
          import.meta.url,
        ).href,
        price: 3800,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 2,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Medium (10")' }],
          },
          { productSlug: 'zinger-burger', quantity: 2 },
          { productSlug: 'chicken-leg-piece', quantity: 1 },
          { productSlug: 'small-fries', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1.5 L' }],
          },
        ],
      },
      {
        id: 'big-deal-5',
        name: 'Big Deal 5',
        image: new URL(
          '../assets/deals/Big Deals/Big Deal 5.webp',
          import.meta.url,
        ).href,
        price: 4600,
        items: [
          {
            productSlug: 'bitex-special-pizza',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: 'Large (13")' }],
          },
          { productSlug: 'zinger-burger', quantity: 4 },
          { productSlug: '10-hot-wings', quantity: 1 },
          { productSlug: 'medium-fries', quantity: 1 },
          {
            productSlug: 'bitex-cold-drink',
            quantity: 1,
            variationSelections: [{ variationName: 'Size', optionLabel: '1.5 L' }],
          },
        ],
      },
    ],
  },
];

export default deals;
