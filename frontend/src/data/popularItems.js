/**
 * Lightweight popular-product summaries keep the home route independent from the full
 * catalog. Build-time consistency checks still validate every product reference.
 */
const popularItems = [
  {
    productId: 'f9001',
    label: 'Cheese Pasta',
    src: new URL('../assets/menu/pasta/cheese pasta.webp', import.meta.url).href,
    alt: 'Cheese Pasta',
    to: '/productdetail/cheese-pasta',
  },
  {
    productId: 'f11010',
    label: 'American Beef Steak',
    src: new URL('../assets/menu/steak/american beef steak.webp', import.meta.url).href,
    alt: 'American Beef Steak',
    to: '/productdetail/american-beef-steak',
  },
  {
    productId: 'f3008',
    label: 'Chicken BBQ Pizza',
    src: new URL('../assets/menu/pizza/chicken BBQ.webp', import.meta.url).href,
    alt: 'Chicken BBQ Pizza',
    to: '/productdetail/chicken-bbq-pizza',
  },
  {
    productId: 'f5004',
    label: 'Vegetable Chow Mein',
    src: new URL('../assets/menu/chinese/vegetable chow mein.webp', import.meta.url).href,
    alt: 'Vegetable Chow Mein',
    to: '/productdetail/vegetable-chow-mein',
  },
  {
    productId: 'f2004',
    label: 'Zinger Burger',
    src: new URL('../assets/menu/burger/zinger.webp', import.meta.url).href,
    alt: 'Zinger Burger',
    to: '/productdetail/zinger-burger',
  },
];

export default popularItems;
