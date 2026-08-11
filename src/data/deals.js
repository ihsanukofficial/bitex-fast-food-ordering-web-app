/**
 * Promotional deal collections, including section theming and purchasable deal records.
 * Each deal owns its bundled asset URL so cards and cart entries share the same image.
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
          '2 Small Chicken Tikka BBQ Pizzas',
          '2 Zinger Burgers',
          '10 Hot Wings',
          '1 × 1 L Cold Drink',
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
          '2 Medium Chicken Tikka BBQ Pizzas',
          '2 Chicken Patty Burgers',
          '2 Chicken Shawarmas',
          '1 × 1 L Cold Drink',
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
          '2 Large Chicken Tikka BBQ Pizzas',
          '10 Hot Wings',
          '2 Fried Chicken Pieces',
          '2 Chicken Paratha Rolls',
          '1 × 1.5 L Cold Drink',
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
          '2 Small Chicken Tikka Pizzas',
          '4 Zinger Burgers',
          '4 Fried Chicken Pieces',
          '1 × 1.5 L Cold Drink',
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
          '2 Large Chicken Tikka Pizzas',
          '2 Zinger Burgers',
          '1 × 1.5 L Cold Drink',
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
        items: ['3 Small Pizzas', '1 × 1 L Cold Drink'],
      },
      {
        id: 'super-deal-2',
        name: 'Super Deal 2',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 2.webp',
          import.meta.url,
        ).href,
        price: 3700,
        items: ['3 Medium Pizzas'],
      },
      {
        id: 'super-deal-3',
        name: 'Super Deal 3',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 3.webp',
          import.meta.url,
        ).href,
        price: 4900,
        items: ['3 Large Pizzas', '1 × 1.5 L Cold Drink'],
      },
      {
        id: 'super-deal-4',
        name: 'Super Deal 4',
        image: new URL(
          '../assets/deals/Super Pizza Deals/Super Deal 4.webp',
          import.meta.url,
        ).href,
        price: 6200,
        items: ['3 Family-Size Pizzas', '1 × 1.5 L Cold Drink'],
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
          '1 Small Pizza',
          '1 Zinger Burger',
          '5 Hot Wings',
          '1 Regular Fries',
          '1 × 1 L Cold Drink',
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
          '1 Medium Pizza',
          '10 Hot Wings',
          '1 Chicken Patty Burger',
          '1 × 1.5 L Cold Drink',
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
          '1 Medium Pizza',
          '3 Zinger Burgers',
          '2 Fried Chicken Pieces',
          '1 Medium Fries',
          '1 × 1.5 L Cold Drink',
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
          '2 Medium Pizzas',
          '2 Zinger Burgers',
          '1 Fried Chicken Piece',
          '1 Regular Fries',
          '1 × 1.5 L Cold Drink',
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
          '1 Large Pizza',
          '4 Zinger Burgers',
          '10 Hot Wings',
          '1 Medium Fries',
          '1 × 1.5 L Cold Drink',
        ],
      },
    ],
  },
];

export default deals;
