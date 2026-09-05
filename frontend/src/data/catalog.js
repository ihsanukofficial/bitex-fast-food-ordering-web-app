/**
 * Canonical product catalog used by menu listings, product details, and cart hydration.
 * Derived metadata is normalized at export time to keep source records internally consistent.
 */
import { CATEGORY_IDS, getCategoryById } from './categories.js';

const products = [
  // Pizza
  {
    id: "f3001",
    slug: "bitex-special-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "BiteX Special Pizza",

    images: [new URL("../assets/menu/pizza/bitex special.webp", import.meta.url).href],

    shortDescription:
      "Our signature loaded pizza topped with premium meats, vegetables, and extra mozzarella cheese.",

    longDescription:
      "The BiteX Special Pizza is our signature creation, generously topped with tender grilled chicken, beef pepperoni, black olives, mushrooms, green peppers, onions, sweet corn, and a rich layer of premium mozzarella cheese. Finished with our signature pizza sauce and baked on a freshly hand-tossed crust, it's the perfect choice for anyone who loves a fully loaded pizza packed with bold flavors.",

    price: {
      originalPrice: 949,
      discountPercentage: 0,
      discountedPrice: 949,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 949,
            discountPercentage: 0,
            discountedPrice: 949,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1749,
            discountPercentage: 5,
            discountedPrice: 1662,
          },
          {
            label: 'Large (13")',
            originalPrice: 2449,
            discountPercentage: 10,
            discountedPrice: 2204,
          },
          {
            label: 'Family (16")',
            originalPrice: 3299,
            discountPercentage: 15,
            discountedPrice: 2804,
          },
        ],
      },
      
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Chicken",
        price: 299,
      },
      {
        name: "Extra Beef Pepperoni",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Grilled Chicken",
      "Beef Pepperoni",
      "Black Olives",
      "Mushrooms",
      "Green Peppers",
      "Sweet Corn",
      "Onions",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 980,
    },

    spiceLevel: 2,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Signature", "Best Seller"],

    tags: ["Loaded", "Premium", "Cheesy", "Chicken", "Pepperoni"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3002",
    slug: "pepperoni-beef-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Pepperoni Beef Pizza",

    images: [new URL("../assets/menu/pizza/pepperoni beef.webp", import.meta.url).href],

    shortDescription:
      "A delicious pizza topped with premium beef pepperoni and extra mozzarella cheese.",

    longDescription:
      "Our Pepperoni Beef Pizza is crafted with premium beef pepperoni layered over rich mozzarella cheese and our signature tomato pizza sauce. Baked on a freshly hand-tossed crust and finished with a sprinkle of Italian herbs, this pizza delivers a bold, smoky, and cheesy flavor that's perfect for pepperoni lovers.",

    price: {
      originalPrice: 899,
      discountPercentage: 0,
      discountedPrice: 899,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 899,
            discountPercentage: 0,
            discountedPrice: 899,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1649,
            discountPercentage: 5,
            discountedPrice: 1567,
          },
          {
            label: 'Large (13")',
            originalPrice: 2299,
            discountPercentage: 10,
            discountedPrice: 2069,
          },
          {
            label: 'Family (16")',
            originalPrice: 3099,
            discountPercentage: 15,
            discountedPrice: 2634,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Beef Pepperoni",
        price: 299,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Beef Pepperoni",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 910,
    },

    spiceLevel: 2,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Customer Favorite"],

    tags: ["Pepperoni", "Beef", "Cheesy", "Classic"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3003",
    slug: "veggie-delight-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Veggie Delight Pizza",

    images: [new URL("../assets/menu/pizza/veggie delight.webp", import.meta.url).href],

    shortDescription:
      "A colorful medley of fresh garden vegetables topped with rich mozzarella cheese.",

    longDescription:
      "Our Veggie Delight Pizza is a fresh and flavorful choice for vegetable lovers. It's generously topped with crunchy bell peppers, onions, mushrooms, black olives, sweet corn, juicy tomatoes, and premium mozzarella cheese over our signature pizza sauce. Baked on a hand-tossed crust, every slice delivers a delicious combination of freshness, cheesiness, and authentic Italian-inspired flavor.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 699,
            discountPercentage: 0,
            discountedPrice: 699,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1249,
            discountPercentage: 5,
            discountedPrice: 1187,
          },
          {
            label: 'Large (13")',
            originalPrice: 1849,
            discountPercentage: 10,
            discountedPrice: 1664,
          },
          {
            label: 'Family (16")',
            originalPrice: 2399,
            discountPercentage: 15,
            discountedPrice: 2039,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Mushrooms",
        price: 149,
      },
      {
        name: "Extra Olives",
        price: 149,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Bell Peppers",
      "Onions",
      "Mushrooms",
      "Black Olives",
      "Sweet Corn",
      "Tomatoes",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 790,
    },

    spiceLevel: 0,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Vegetarian"],

    tags: ["Veggie", "Fresh", "Cheesy", "Garden Fresh"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3004",
    slug: "chicken-tandoori-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Chicken Tandoori Pizza",

    images: [new URL("../assets/menu/pizza/chicken tandoori.webp", import.meta.url).href],

    shortDescription:
      "Tender tandoori chicken with fresh vegetables, mozzarella, and bold desi flavors.",

    longDescription:
      "Our Chicken Tandoori Pizza brings together juicy tandoori-marinated chicken, fresh onions, green capsicum, tomatoes, and premium mozzarella cheese over our signature pizza sauce. Finished with aromatic herbs and baked on a freshly hand-tossed crust, this pizza delivers the perfect fusion of authentic Pakistani tandoori flavors and classic Italian-style pizza.",

    price: {
      originalPrice: 799,
      discountPercentage: 0,
      discountedPrice: 799,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 799,
            discountPercentage: 0,
            discountedPrice: 799,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1499,
            discountPercentage: 5,
            discountedPrice: 1424,
          },
          {
            label: 'Large (13")',
            originalPrice: 2099,
            discountPercentage: 10,
            discountedPrice: 1889,
          },
          {
            label: 'Family (16")',
            originalPrice: 2799,
            discountPercentage: 15,
            discountedPrice: 2379,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Tandoori Chicken",
        price: 299,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Tandoori Chicken",
      "Green Capsicum",
      "Onions",
      "Tomatoes",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 890,
    },

    spiceLevel: 3,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Customer Favorite"],

    tags: ["Chicken", "Tandoori", "Spicy", "Cheesy", "Desi Flavor"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3005",
    slug: "creamy-malai-boti-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Creamy Malai Boti Pizza",

    images: [new URL("../assets/menu/pizza/creamy malali boti.webp", import.meta.url).href],

    shortDescription:
      "Tender malai boti chicken with creamy sauce, mozzarella, and a rich cheesy finish.",

    longDescription:
      "Our Creamy Malai Boti Pizza is made with succulent malai-marinated chicken, creamy garlic sauce, premium mozzarella cheese, onions, and green capsicum. Baked on a freshly hand-tossed crust, every slice is rich, creamy, and packed with smooth, savory flavors, making it a perfect choice for those who enjoy mild yet indulgent pizzas.",

    price: {
      originalPrice: 849,
      discountPercentage: 0,
      discountedPrice: 849,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 849,
            discountPercentage: 0,
            discountedPrice: 849,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1549,
            discountPercentage: 5,
            discountedPrice: 1472,
          },
          {
            label: 'Large (13")',
            originalPrice: 2199,
            discountPercentage: 10,
            discountedPrice: 1979,
          },
          {
            label: 'Family (16")',
            originalPrice: 2999,
            discountPercentage: 15,
            discountedPrice: 2549,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Malai Chicken",
        price: 299,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Creamy Garlic Sauce",
      "Mozzarella Cheese",
      "Malai Boti Chicken",
      "Onions",
      "Green Capsicum",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 940,
    },

    spiceLevel: 1,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Chef's Choice", "Creamy Favorite"],

    tags: ["Chicken", "Creamy", "Malai Boti", "Cheesy", "Mild"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3006",
    slug: "chicken-supreme-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Chicken Supreme Pizza",

    images: [new URL("../assets/menu/pizza/chicken supreme.webp", import.meta.url).href],

    shortDescription:
      "Loaded with juicy grilled chicken, fresh vegetables, and premium mozzarella cheese.",

    longDescription:
      "Our Chicken Supreme Pizza is topped with tender grilled chicken, fresh onions, green capsicum, mushrooms, black olives, sweet corn, and premium mozzarella cheese over our signature pizza sauce. Baked to perfection on a hand-tossed crust, it's a hearty, cheesy, and flavorful pizza that's perfect for every chicken lover.",

    price: {
      originalPrice: 849,
      discountPercentage: 0,
      discountedPrice: 849,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 849,
            discountPercentage: 0,
            discountedPrice: 849,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1549,
            discountPercentage: 5,
            discountedPrice: 1472,
          },
          {
            label: 'Large (13")',
            originalPrice: 2199,
            discountPercentage: 10,
            discountedPrice: 1979,
          },
          {
            label: 'Family (16")',
            originalPrice: 2999,
            discountPercentage: 15,
            discountedPrice: 2549,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Grilled Chicken",
        price: 299,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Grilled Chicken",
      "Mushrooms",
      "Black Olives",
      "Green Capsicum",
      "Sweet Corn",
      "Onions",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 930,
    },

    spiceLevel: 2,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Best Seller", "Chicken Favorite"],

    tags: ["Chicken", "Loaded", "Cheesy", "Premium", "Supreme"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3007",
    slug: "cheese-lover-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Cheese Lover Pizza",

    images: [new URL("../assets/menu/pizza/cheese lover.webp", import.meta.url).href],

    shortDescription:
      "A rich and cheesy pizza loaded with premium mozzarella and irresistible creamy flavor.",

    longDescription:
      "Our Cheese Lover Pizza is specially crafted for true cheese enthusiasts. Made with a generous layer of premium mozzarella, rich cheddar, and our signature pizza sauce, every slice delivers an irresistibly creamy, gooey, and satisfying experience. Baked on a freshly hand-tossed crust and finished with Italian herbs, it's the perfect comfort food for every cheese lover.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 699,
            discountPercentage: 0,
            discountedPrice: 699,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1299,
            discountPercentage: 5,
            discountedPrice: 1234,
          },
          {
            label: 'Large (13")',
            originalPrice: 1899,
            discountPercentage: 10,
            discountedPrice: 1709,
          },
          {
            label: 'Family (16")',
            originalPrice: 2499,
            discountPercentage: 15,
            discountedPrice: 2124,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Mozzarella",
        price: 199,
      },
      {
        name: "Cheddar Cheese",
        price: 179,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Cheddar Cheese",
      "Parmesan Cheese",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 960,
    },

    spiceLevel: 0,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Cheese Lover", "Customer Favorite"],

    tags: ["Cheesy", "Creamy", "Vegetarian", "Classic", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3008",
    slug: "chicken-bbq-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Chicken BBQ Pizza",

    images: [new URL("../assets/menu/pizza/chicken BBQ.webp", import.meta.url).href],

    shortDescription:
      "Smoky BBQ chicken, mozzarella cheese, and fresh vegetables on a perfectly baked crust.",

    longDescription:
      "Our Chicken BBQ Pizza is topped with tender grilled BBQ chicken, smoky barbecue sauce, premium mozzarella cheese, onions, green capsicum, and a sprinkle of Italian herbs. Baked on a freshly hand-tossed crust, every slice offers the perfect balance of sweet, smoky, and cheesy flavors that make this pizza an instant favorite.",

    price: {
      originalPrice: 799,
      discountPercentage: 0,
      discountedPrice: 799,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 799,
            discountPercentage: 0,
            discountedPrice: 799,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1449,
            discountPercentage: 5,
            discountedPrice: 1377,
          },
          {
            label: 'Large (13")',
            originalPrice: 2099,
            discountPercentage: 10,
            discountedPrice: 1889,
          },
          {
            label: 'Family (16")',
            originalPrice: 2799,
            discountPercentage: 15,
            discountedPrice: 2379,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra BBQ Chicken",
        price: 299,
      },
      {
        name: "Stuffed Crust",
        price: 349,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "BBQ Sauce",
      "Mozzarella Cheese",
      "Grilled BBQ Chicken",
      "Onions",
      "Green Capsicum",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 910,
    },

    spiceLevel: 1,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Smoky Favorite", "Best Seller"],

    tags: ["Chicken", "BBQ", "Smoky", "Cheesy", "Grilled"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3009",
    slug: "chicken-fajita-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Chicken Fajita Pizza",

    images: [new URL("../assets/menu/pizza/chicken fajita.webp", import.meta.url).href],

    shortDescription:
      "Spicy fajita chicken with fresh vegetables and premium mozzarella cheese.",

    longDescription:
      "Our Chicken Fajita Pizza is topped with juicy fajita-seasoned chicken, fresh onions, green capsicum, tomatoes, and premium mozzarella cheese over our signature pizza sauce. Baked on a hand-tossed crust and finished with aromatic herbs, this pizza delivers a delicious combination of bold Mexican-inspired flavors and cheesy goodness in every slice.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 749,
            discountPercentage: 0,
            discountedPrice: 749,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1399,
            discountPercentage: 5,
            discountedPrice: 1329,
          },
          {
            label: 'Large (13")',
            originalPrice: 1999,
            discountPercentage: 10,
            discountedPrice: 1799,
          },
          {
            label: 'Family (16")',
            originalPrice: 2699,
            discountPercentage: 15,
            discountedPrice: 2294,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Fajita Chicken",
        price: 299,
      },
      {
        name: "Jalapeños",
        price: 149,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Fajita Chicken",
      "Green Capsicum",
      "Onions",
      "Tomatoes",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 900,
    },

    spiceLevel: 3,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Spicy Favorite"],

    tags: ["Chicken", "Fajita", "Spicy", "Cheesy", "Loaded"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f3010",
    slug: "chicken-tikka-pizza",

    categoryId: CATEGORY_IDS.PIZZA,
    title: "Chicken Tikka Pizza",

    images: [new URL("../assets/menu/pizza/chicken tikka.webp", import.meta.url).href],

    shortDescription:
      "Tender chicken tikka with fresh vegetables, mozzarella cheese, and authentic desi flavors.",

    longDescription:
      "Our Chicken Tikka Pizza is topped with succulent chicken tikka pieces, premium mozzarella cheese, onions, green capsicum, tomatoes, and our signature pizza sauce. Baked on a freshly hand-tossed crust and finished with aromatic herbs, this pizza perfectly blends the bold taste of traditional chicken tikka with the irresistible goodness of a classic pizza.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: 'Small (7")',
            originalPrice: 749,
            discountPercentage: 0,
            discountedPrice: 749,
          },
          {
            label: 'Medium (10")',
            originalPrice: 1399,
            discountPercentage: 5,
            discountedPrice: 1329,
          },
          {
            label: 'Large (13")',
            originalPrice: 1999,
            discountPercentage: 10,
            discountedPrice: 1799,
          },
          {
            label: 'Family (16")',
            originalPrice: 2699,
            discountPercentage: 15,
            discountedPrice: 2294,
          },
        ],
      },
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 199,
      },
      {
        name: "Extra Chicken Tikka",
        price: 299,
      },
      {
        name: "Jalapeños",
        price: 149,
      },
    ],

    ingredients: [
      "Pizza Dough",
      "Signature Pizza Sauce",
      "Mozzarella Cheese",
      "Chicken Tikka",
      "Onions",
      "Green Capsicum",
      "Tomatoes",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk"],

    nutrition: {
      calories: 895,
    },

    spiceLevel: 3,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Desi Favorite", "Best Seller"],

    tags: ["Chicken", "Tikka", "Spicy", "Cheesy", "Desi"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Burgers
  {
    id: "f2001",
    slug: "american-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "American Burger",

    images: [new URL("../assets/menu/burger/american burger.webp", import.meta.url).href],

    shortDescription:
      "A classic American-style beef burger loaded with fresh vegetables and signature sauce.",

    longDescription:
      "Our American Burger features a juicy grilled beef patty, melted cheddar cheese, crisp lettuce, fresh tomatoes, sliced onions, crunchy pickles, and our signature burger sauce, all served inside a soft toasted sesame bun. Every bite delivers the authentic taste of a classic American burger with rich flavors and premium ingredients.",

    price: {
      originalPrice: 549,
      discountPercentage: 0,
      discountedPrice: 549,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Beef Patty",
        price: 249,
      },
      {
        name: "Extra Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Grilled Beef Patty",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Signature Burger Sauce",
    ],

    allergens: ["Gluten", "Milk", "Sesame"],

    nutrition: {
      calories: 760,
    },

    spiceLevel: 1,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Classic", "Best Seller"],

    tags: ["Beef", "American", "Grilled", "Classic", "Cheesy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2002",
    slug: "tikka-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Tikka Burger",

    images: [new URL("../assets/menu/burger/tikka burger.webp", import.meta.url).href],

    shortDescription:
      "A flavorful chicken tikka fillet burger with fresh vegetables and creamy sauce.",

    longDescription:
      "Our Tikka Burger features a tender chicken fillet marinated in authentic tikka spices, grilled to perfection, and topped with crisp lettuce, fresh tomatoes, onions, and our signature creamy sauce. Served in a freshly toasted sesame bun, it's a delicious fusion of smoky desi flavors and classic burger goodness.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Chicken Patty",
        price: 199,
      },
      {
        name: "Extra Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Chicken Tikka Fillet",
      "Lettuce",
      "Tomato",
      "Onion",
      "Creamy Sauce",
    ],

    allergens: ["Gluten", "Milk", "Sesame"],

    nutrition: {
      calories: 610,
    },

    spiceLevel: 3,

    preparationTime: "10-15 min",

    available: true,

    badges: ["Desi Favorite"],

    tags: ["Chicken", "Tikka", "Spicy", "Grilled", "Desi"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2003",
    slug: "chicken-patty-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Chicken Patty Burger",

    images: [new URL("../assets/menu/burger/chicken patty.webp", import.meta.url).href],

    shortDescription:
      "A crispy chicken patty burger with fresh vegetables and creamy mayo.",

    longDescription:
      "Our Chicken Patty Burger features a golden, crispy chicken patty layered with fresh lettuce, juicy tomatoes, sliced onions, and creamy mayonnaise inside a soft toasted sesame bun. Every bite delivers the perfect combination of crunch, tenderness, and rich flavor, making it an ideal choice for a quick and satisfying meal.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Chicken Patty",
        price: 199,
      },
      {
        name: "Extra Mayo",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Chicken Patty",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
    ],

    allergens: ["Gluten", "Milk", "Sesame", "Egg"],

    nutrition: {
      calories: 590,
    },

    spiceLevel: 1,

    preparationTime: "10-15 min",

    available: true,

    badges: ["Customer Favorite"],

    tags: ["Chicken", "Crispy", "Classic", "Juicy", "Mayo"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2004",
    slug: "zinger-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Zinger Burger",

    images: [new URL("../assets/menu/burger/zinger.webp", import.meta.url).href],

    shortDescription:
      "A crispy golden zinger fillet layered with fresh vegetables and creamy mayo.",

    longDescription:
      "Our Zinger Burger features a perfectly seasoned crispy chicken fillet, fried until golden and crunchy, then topped with fresh lettuce, juicy tomatoes, sliced onions, and creamy mayonnaise inside a soft toasted sesame bun. Every bite delivers an irresistible combination of crunch, tenderness, and flavor, making it one of BiteX's most popular burgers.",

    price: {
      originalPrice: 499,
      discountPercentage: 0,
      discountedPrice: 499,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Zinger Fillet",
        price: 249,
      },
      {
        name: "Extra Mayo",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Zinger Chicken Fillet",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 720,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Customer Favorite"],

    tags: ["Chicken", "Zinger", "Crispy", "Crunchy", "Classic"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2005",
    slug: "zinger-cheese-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Zinger Cheese Burger",

    images: [new URL("../assets/menu/burger/zinger cheese burger.webp", import.meta.url).href],

    shortDescription:
      "A crispy zinger fillet topped with melted cheddar cheese and fresh vegetables.",

    longDescription:
      "Our Zinger Cheese Burger features a crispy golden chicken zinger fillet layered with melted cheddar cheese, crisp lettuce, fresh tomatoes, sliced onions, and creamy mayonnaise inside a soft toasted sesame bun. Every bite delivers the perfect combination of crunchy chicken, rich cheese, and fresh ingredients, making it an irresistible choice for cheese lovers.",

    price: {
      originalPrice: 599,
      discountPercentage: 0,
      discountedPrice: 599,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Zinger Fillet",
        price: 249,
      },
      {
        name: "Extra Mayo",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Zinger Chicken Fillet",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 810,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Cheese Lover"],

    tags: ["Chicken", "Zinger", "Cheesy", "Crispy", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2006",
    slug: "pizza-patty-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Pizza Patty Burger",

    images: [new URL("../assets/menu/burger/pizza patty burger.webp", import.meta.url).href],

    shortDescription:
      "A crispy chicken patty topped with pizza sauce, melted mozzarella, and fresh vegetables.",

    longDescription:
      "Our Pizza Patty Burger combines the best of burgers and pizza in one delicious bite. It features a crispy chicken patty layered with rich pizza sauce, melted mozzarella cheese, fresh lettuce, tomatoes, onions, and a sprinkle of Italian herbs, all served inside a soft toasted sesame bun. It's cheesy, crispy, and packed with bold pizza-inspired flavors.",

    price: {
      originalPrice: 649,
      discountPercentage: 0,
      discountedPrice: 649,
    },

    variations: [],

    addons: [
      {
        name: "Extra Mozzarella Cheese",
        price: 99,
      },
      {
        name: "Extra Chicken Patty",
        price: 199,
      },
      {
        name: "Extra Pizza Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Chicken Patty",
      "Pizza Sauce",
      "Mozzarella Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 840,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Chef's Choice", "Fusion Favorite"],

    tags: ["Chicken", "Pizza", "Cheesy", "Fusion", "Crispy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2007",
    slug: "fish-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Fish Burger",

    images: [new URL("../assets/menu/burger/fish burger.webp", import.meta.url).href],

    shortDescription:
      "A crispy golden fish fillet burger served with fresh vegetables and creamy tartar sauce.",

    longDescription:
      "Our Fish Burger features a tender, flaky fish fillet coated in a crispy golden crumb, topped with fresh lettuce, juicy tomatoes, sliced onions, and creamy tartar sauce inside a soft toasted sesame bun. Every bite offers a light, crunchy, and flavorful seafood experience that's perfect for fish lovers seeking something different.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Fish Fillet",
        price: 299,
      },
      {
        name: "Extra Tartar Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Fish Fillet",
      "Lettuce",
      "Tomato",
      "Onion",
      "Tartar Sauce",
    ],

    allergens: ["Fish", "Gluten", "Egg", "Milk", "Sesame"],

    nutrition: {
      calories: 690,
    },

    spiceLevel: 1,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Seafood Special", "Chef's Choice"],

    tags: ["Fish", "Seafood", "Crispy", "Fresh", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2008",
    slug: "crispy-fried-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Crispy Fried Burger",

    images: [new URL("../assets/menu/burger/crispy fried burger.webp", import.meta.url).href],

    shortDescription:
      "A golden crispy fried chicken burger with fresh vegetables and creamy mayo.",

    longDescription:
      "Our Crispy Fried Burger features a perfectly seasoned chicken fillet coated in a crunchy golden crust, topped with crisp lettuce, juicy tomatoes, sliced onions, and creamy mayonnaise inside a freshly toasted sesame bun. Every bite delivers an irresistible combination of crispy texture, juicy chicken, and fresh ingredients for a truly satisfying meal.",

    price: {
      originalPrice: 649,
      discountPercentage: 0,
      discountedPrice: 649,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Crispy Chicken Fillet",
        price: 249,
      },
      {
        name: "Extra Mayo",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Fried Chicken Fillet",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
    ],

    allergens: ["Gluten", "Egg", "Milk", "Sesame"],

    nutrition: {
      calories: 730,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Customer Favorite", "Crispy Special"],

    tags: ["Chicken", "Crispy", "Fried", "Crunchy", "Classic"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2009",
    slug: "grilled-chicken-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Grilled Chicken Burger",

    images: [new URL("../assets/menu/burger/grilled chicken burger.webp", import.meta.url).href],

    shortDescription:
      "A juicy grilled chicken burger topped with fresh vegetables and signature sauce.",

    longDescription:
      "Our Grilled Chicken Burger features a tender, flame-grilled chicken breast seasoned with aromatic herbs and spices, layered with crisp lettuce, fresh tomatoes, sliced onions, and our signature garlic mayo inside a freshly toasted sesame bun. Every bite delivers a smoky, juicy, and wholesome flavor that's perfect for those who prefer grilled over fried.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Grilled Chicken",
        price: 249,
      },
      {
        name: "Extra Garlic Mayo",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Grilled Chicken Breast",
      "Lettuce",
      "Tomato",
      "Onion",
      "Garlic Mayo",
    ],

    allergens: ["Gluten", "Egg", "Milk", "Sesame"],

    nutrition: {
      calories: 640,
    },

    spiceLevel: 1,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Healthy Choice", "Grilled Favorite"],

    tags: ["Chicken", "Grilled", "Healthy", "Juicy", "Smoky"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2010",
    slug: "tower-cheese-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Tower Cheese Burger",

    images: [new URL("../assets/menu/burger/tower cheese burger.webp", import.meta.url).href],

    shortDescription:
      "A giant double-layer chicken burger stacked with melted cheese and fresh vegetables.",

    longDescription:
      "Our Tower Cheese Burger is built for big appetites, featuring two crispy chicken fillets layered with slices of melted cheddar cheese, crisp lettuce, juicy tomatoes, fresh onions, creamy mayonnaise, and our signature burger sauce. Served in a freshly toasted sesame bun, every bite delivers a satisfying combination of crunchy chicken, rich cheese, and bold flavors that make this burger a true BiteX signature.",

    price: {
      originalPrice: 799,
      discountPercentage: 0,
      discountedPrice: 799,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Crispy Chicken Fillet",
        price: 249,
      },
      {
        name: "Extra Burger Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "2 Crispy Chicken Fillets",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
      "Signature Burger Sauce",
    ],

    allergens: ["Gluten", "Egg", "Milk", "Sesame"],

    nutrition: {
      calories: 1120,
    },

    spiceLevel: 2,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Big Bite", "Best Seller"],

    tags: ["Tower", "Double Chicken", "Cheesy", "Crispy", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2011",
    slug: "pizza-zinger-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Pizza Zinger Burger",

    images: [new URL("../assets/menu/burger/pizza zinger burger.webp", import.meta.url).href],

    shortDescription:
      "A crispy zinger fillet loaded with pizza sauce, mozzarella cheese, and fresh vegetables.",

    longDescription:
      "Our Pizza Zinger Burger brings together the irresistible crunch of a crispy zinger fillet with the rich flavors of a classic pizza. Layered with pizza sauce, melted mozzarella cheese, fresh lettuce, tomatoes, onions, and Italian herbs inside a toasted sesame bun, this burger delivers a cheesy, crispy, and satisfying fusion that's perfect for pizza and burger lovers alike.",

    price: {
      originalPrice: 799,
      discountPercentage: 0,
      discountedPrice: 799,
    },

    variations: [],

    addons: [
      {
        name: "Extra Mozzarella Cheese",
        price: 99,
      },
      {
        name: "Extra Zinger Fillet",
        price: 249,
      },
      {
        name: "Extra Pizza Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Crispy Zinger Chicken Fillet",
      "Pizza Sauce",
      "Mozzarella Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Italian Herbs",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 920,
    },

    spiceLevel: 2,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Fusion Favorite", "Chef's Choice", "Premium"],

    tags: ["Chicken", "Zinger", "Pizza", "Cheesy", "Fusion"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2012",
    slug: "stuffed-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Stuffed Burger",

    images: [new URL("../assets/menu/burger/stuffed Burger.webp", import.meta.url).href],

    shortDescription:
      "A premium stuffed chicken burger with a molten cheese center and signature sauces.",

    longDescription:
      "Our Stuffed Burger is crafted for true burger lovers, featuring a thick crispy chicken patty stuffed with molten mozzarella cheese. Layered with cheddar cheese, fresh lettuce, juicy tomatoes, onions, creamy mayonnaise, and our signature burger sauce, it's served in a freshly toasted sesame bun. Every bite delivers an explosion of crispy texture, creamy cheese, and bold flavors, making it one of BiteX's most indulgent premium burgers.",

    price: {
      originalPrice: 849,
      discountPercentage: 0,
      discountedPrice: 849,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Stuffed Patty",
        price: 299,
      },
      {
        name: "Extra Burger Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Stuffed Crispy Chicken Patty",
      "Mozzarella Cheese",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
      "Signature Burger Sauce",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 980,
    },

    spiceLevel: 2,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Premium", "Cheese Lover"],

    tags: ["Stuffed", "Chicken", "Cheesy", "Premium", "Crispy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2013",
    slug: "double-decker-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Double Decker Burger",

    images: [new URL("../assets/menu/burger/double decker burger.webp", import.meta.url).href],

    shortDescription:
      "A massive double-layer burger stacked with two juicy chicken fillets, cheese, and fresh vegetables.",

    longDescription:
      "Our Double Decker Burger is built for serious burger lovers. Featuring two crispy chicken fillets layered with melted cheddar cheese, crisp lettuce, fresh tomatoes, onions, creamy mayonnaise, and our signature burger sauce, this premium burger is served in a freshly toasted sesame bun. Every bite delivers double the crunch, double the flavor, and an unforgettable combination of juicy chicken, creamy cheese, and fresh ingredients.",

    price: {
      originalPrice: 899,
      discountPercentage: 0,
      discountedPrice: 899,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Crispy Chicken Fillet",
        price: 249,
      },
      {
        name: "Extra Burger Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "2 Crispy Chicken Fillets",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Mayonnaise",
      "Signature Burger Sauce",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 1180,
    },

    spiceLevel: 2,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Mega Size", "Best Seller"],

    tags: ["Double", "Chicken", "Cheesy", "Premium", "Loaded"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2014",
    slug: "bitex-special-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "BiteX Special Burger",

    images: [new URL("../assets/menu/burger/biteX burger.webp", import.meta.url).href],

    shortDescription:
      "Our ultimate signature burger loaded with premium chicken, double cheese, fresh vegetables, and BiteX special sauce.",

    longDescription:
      "The BiteX Special Burger is the pride of our menu, crafted with a premium crispy chicken fillet, melted cheddar and mozzarella cheese, fresh lettuce, juicy tomatoes, crispy onions, pickles, and our exclusive BiteX Special Sauce. Served in a freshly toasted sesame bun, this masterpiece combines rich flavors, premium ingredients, and generous portions to deliver the ultimate burger experience in every bite.",

    price: {
      originalPrice: 949,
      discountPercentage: 0,
      discountedPrice: 949,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Crispy Chicken Fillet",
        price: 249,
      },
      {
        name: "Extra BiteX Special Sauce",
        price: 79,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Premium Crispy Chicken Fillet",
      "Cheddar Cheese",
      "Mozzarella Cheese",
      "Lettuce",
      "Tomato",
      "Crispy Onion",
      "Pickles",
      "BiteX Special Sauce",
    ],

    allergens: ["Gluten", "Milk", "Egg", "Sesame"],

    nutrition: {
      calories: 1080,
    },

    spiceLevel: 2,

    preparationTime: "15-20 min",

    available: true,

    badges: ["Signature", "Chef's Special", "Best Seller", "Premium"],

    tags: ["Signature", "Chicken", "Premium", "Loaded", "Cheesy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f2015",
    slug: "beef-burger",

    categoryId: CATEGORY_IDS.BURGER,
    title: "Beef Burger",

    images: [new URL("../assets/menu/burger/beef burger.webp", import.meta.url).href],

    shortDescription:
      "A premium grilled beef burger loaded with cheddar cheese, fresh vegetables, and signature sauce.",

    longDescription:
      "Our Beef Burger is crafted with a thick, juicy grilled beef patty made from premium quality beef, topped with melted cheddar cheese, crisp lettuce, fresh tomatoes, onions, crunchy pickles, and our signature BiteX burger sauce. Served in a freshly toasted sesame bun, every bite delivers rich, smoky flavors, tender beef, and the perfect balance of freshness, making it a must-try for every beef lover.",

    price: {
      originalPrice: 949,
      discountPercentage: 0,
      discountedPrice: 949,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Patty",
        price: 299,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra BiteX Sauce",
        price: 79,
      },
    ],

    ingredients: [
      "Sesame Bun",
      "Premium Grilled Beef Patty",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "BiteX Signature Sauce",
    ],

    allergens: ["Gluten", "Milk", "Sesame"],

    nutrition: {
      calories: 980,
    },

    spiceLevel: 1,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Premium", "Beef Lover", "Chef's Choice"],

    tags: ["Beef", "Grilled", "Premium", "Juicy", "Classic"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Chinese
  {
    id: "f5001",
    slug: "vegetable-fried-rice",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Vegetable Fried Rice",

    images: [new URL("../assets/menu/chinese/vegetable fried rice.webp", import.meta.url).href],

    shortDescription:
      "Fragrant stir-fried rice tossed with fresh vegetables and authentic Asian seasonings.",

    longDescription:
      "Our Vegetable Fried Rice is prepared with premium long-grain rice, stir-fried over high heat with fresh carrots, cabbage, capsicum, green onions, sweet corn, and aromatic garlic. Seasoned with our signature soy-based sauce and authentic Asian spices, every serving delivers a perfect balance of freshness, flavor, and texture that's ideal as a meal on its own or alongside your favorite side dish.",

    price: {
      originalPrice: 599,
      discountPercentage: 0,
      discountedPrice: 599,
    },

    variations: [],

    addons: [
      {
        name: "Fried Egg",
        price: 99,
      },
      {
        name: "Extra Vegetables",
        price: 99,
      },
      {
        name: "Extra Rice",
        price: 149,
      },
    ],

    ingredients: [
      "Long Grain Rice",
      "Carrots",
      "Cabbage",
      "Capsicum",
      "Sweet Corn",
      "Green Onions",
      "Garlic",
      "Soy Sauce",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Soy", "Gluten"],

    nutrition: {
      calories: 680,
    },

    spiceLevel: 1,

    preparationTime: "15-20 min",

    available: true,

    badges: ["Vegetarian", "Healthy Choice"],

    tags: ["Chinese", "Rice", "Vegetarian", "Fresh", "Stir-Fried"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f5002",
    slug: "chicken-fried-rice",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Chicken Fried Rice",

    images: [new URL("../assets/menu/chinese/chicken fried rice.webp", import.meta.url).href],

    shortDescription:
      "Wok-tossed fried rice with tender chicken, fresh vegetables, and authentic Asian flavors.",

    longDescription:
      "Our Chicken Fried Rice is prepared with premium long-grain rice stir-fried over high heat with juicy chicken pieces, fresh carrots, cabbage, capsicum, green onions, garlic, and our signature soy-based seasoning. Cooked in a traditional wok, every serving delivers smoky aroma, perfectly balanced flavors, and a satisfying combination of tender chicken and fluffy rice.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Fried Egg",
        price: 99,
      },
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Rice",
        price: 149,
      },
    ],

    ingredients: [
      "Long Grain Rice",
      "Chicken",
      "Carrots",
      "Cabbage",
      "Capsicum",
      "Green Onions",
      "Garlic",
      "Soy Sauce",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Soy", "Gluten"],

    nutrition: {
      calories: 810,
    },

    spiceLevel: 1,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Best Seller", "High Protein"],

    tags: ["Chinese", "Chicken", "Rice", "Wok Tossed", "Protein Rich"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f5003",
    slug: "special-chicken-fried-rice",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Special Chicken Fried Rice",

    images: [new URL("../assets/menu/chinese/special chicken fried rice.webp", import.meta.url).href],

    shortDescription:
      "Premium fried rice loaded with tender chicken, vegetables, egg, and authentic Asian flavors.",

    longDescription:
      "Our Special Chicken Fried Rice is a premium Chinese dish prepared with fragrant long-grain rice, succulent chicken pieces, fluffy scrambled egg, fresh carrots, cabbage, capsicum, sweet corn, green onions, and garlic. Expertly stir-fried in a hot wok with our signature soy-based seasoning and aromatic spices, every serving delivers rich flavor, smoky aroma, and a generous portion that's perfect for a complete meal.",

    price: {
      originalPrice: 899,
      discountPercentage: 0,
      discountedPrice: 899,
    },

    variations: [],

    addons: [
      {
        name: "Fried Egg",
        price: 99,
      },
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Rice",
        price: 149,
      },
    ],

    ingredients: [
      "Long Grain Rice",
      "Chicken",
      "Egg",
      "Carrots",
      "Cabbage",
      "Capsicum",
      "Sweet Corn",
      "Green Onions",
      "Garlic",
      "Soy Sauce",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Egg", "Soy", "Gluten"],

    nutrition: {
      calories: 930,
    },

    spiceLevel: 2,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Signature", "Best Seller", "High Protein"],

    tags: ["Chinese", "Chicken", "Fried Rice", "Signature", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f5004",
    slug: "vegetable-chow-mein",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Vegetable Chow Mein",

    images: [new URL("../assets/menu/chinese/vegetable chow mein.webp", import.meta.url).href],

    shortDescription:
      "Stir-fried noodles tossed with fresh vegetables and authentic Chinese seasonings.",

    longDescription:
      "Our Vegetable Chow Mein is prepared with premium egg noodles stir-fried over high heat with fresh cabbage, carrots, capsicum, onions, sweet corn, green onions, and garlic. Tossed in our signature soy-based sauce and aromatic spices, every serving delivers the perfect balance of smoky wok flavor, fresh vegetables, and satisfying texture for an authentic Chinese dining experience.",

    price: {
      originalPrice: 599,
      discountPercentage: 0,
      discountedPrice: 599,
    },

    variations: [],

    addons: [
      {
        name: "Fried Egg",
        price: 99,
      },
      {
        name: "Extra Vegetables",
        price: 99,
      },
      {
        name: "Extra Noodles",
        price: 149,
      },
    ],

    ingredients: [
      "Egg Noodles",
      "Cabbage",
      "Carrots",
      "Capsicum",
      "Onion",
      "Sweet Corn",
      "Green Onions",
      "Garlic",
      "Soy Sauce",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Gluten", "Soy", "Egg"],

    nutrition: {
      calories: 690,
    },

    spiceLevel: 1,

    preparationTime: "15-20 min",

    available: true,

    badges: ["Vegetarian", "Healthy Choice"],

    tags: ["Chinese", "Noodles", "Vegetarian", "Wok Tossed", "Fresh"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f5005",
    slug: "chicken-chow-mein",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Chicken Chow Mein",

    images: [new URL("../assets/menu/chinese/chicken chow mein.webp", import.meta.url).href],

    shortDescription:
      "Classic wok-tossed noodles with tender chicken, fresh vegetables, and authentic Chinese flavors.",

    longDescription:
      "Our Chicken Chow Mein is prepared using premium egg noodles stir-fried over high heat with tender chicken strips, fresh cabbage, carrots, capsicum, onions, green onions, and garlic. Tossed in our signature soy-based sauce with aromatic spices and sesame oil, every serving delivers smoky wok flavor, juicy chicken, and perfectly cooked noodles for an authentic Chinese dining experience.",

    price: {
      originalPrice: 849,
      discountPercentage: 0,
      discountedPrice: 849,
    },

    variations: [],

    addons: [
      {
        name: "Fried Egg",
        price: 99,
      },
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Noodles",
        price: 149,
      },
    ],

    ingredients: [
      "Egg Noodles",
      "Chicken",
      "Cabbage",
      "Carrots",
      "Capsicum",
      "Onion",
      "Green Onions",
      "Garlic",
      "Soy Sauce",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Gluten", "Soy", "Egg"],

    nutrition: {
      calories: 910,
    },

    spiceLevel: 2,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Best Seller", "High Protein"],

    tags: ["Chinese", "Chicken", "Noodles", "Wok Tossed", "Protein Rich"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f5006",
    slug: "chicken-manchurian-with-rice",

    categoryId: CATEGORY_IDS.CHINESE,
    title: "Chicken Manchurian with Rice",

    images: [new URL("../assets/menu/chinese/chicken manchurian with rice.webp", import.meta.url).href],

    shortDescription:
      "Tender chicken in rich Manchurian sauce served with fragrant egg fried rice.",

    longDescription:
      "Our Chicken Manchurian with Rice features crispy fried chicken pieces tossed in a rich, savory Manchurian sauce made with garlic, ginger, soy sauce, and aromatic spices. Served alongside a generous portion of fragrant egg fried rice, this classic Chinese favorite offers the perfect balance of sweet, spicy, and savory flavors, making it a hearty and satisfying meal for lunch or dinner.",

    price: {
      originalPrice: 1099,
      discountPercentage: 0,
      discountedPrice: 1099,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 249,
      },
      {
        name: "Extra Rice",
        price: 149,
      },
      {
        name: "Extra Manchurian Sauce",
        price: 99,
      },
    ],

    ingredients: [
      "Chicken",
      "Egg Fried Rice",
      "Garlic",
      "Ginger",
      "Soy Sauce",
      "Tomato Ketchup",
      "Chili Sauce",
      "Bell Peppers",
      "Spring Onions",
      "Corn Flour",
      "Black Pepper",
      "Sesame Oil",
    ],

    allergens: ["Gluten", "Soy", "Egg"],

    nutrition: {
      calories: 1180,
    },

    spiceLevel: 2,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Best Seller", "Signature", "High Protein"],

    tags: ["Chinese", "Chicken", "Manchurian", "Rice", "Signature"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Fried chicken
  {
    id: "f6001",
    slug: "chicken-leg-piece",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "Chicken Leg Piece",

    images: [new URL("../assets/menu/fried chicken/chicken leg piece.webp", import.meta.url).href],

    shortDescription:
      "A crispy golden fried chicken leg, marinated with signature spices and cooked to perfection.",

    longDescription:
      "Our Chicken Leg Piece is made from premium fresh chicken, marinated for hours in a blend of signature herbs and spices before being coated in our crispy seasoned breading. Pressure-fried until perfectly golden, it delivers a crunchy exterior with tender, juicy meat inside. Every bite is packed with bold flavor, making it the perfect choice for fried chicken lovers.",

    price: {
      originalPrice: 299,
      discountPercentage: 0,
      discountedPrice: 299,
    },

    variations: [],

    addons: [
      {
        name: "Extra Dip",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
      {
        name: "Soft Drink",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Leg",
      "Wheat Flour",
      "Signature Spice Blend",
      "Black Pepper",
      "Paprika",
      "Garlic Powder",
      "Onion Powder",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 340,
    },

    spiceLevel: 2,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Best Seller", "Crispy", "Freshly Fried"],

    tags: ["Fried Chicken", "Chicken Leg", "Crispy", "Juicy", "Crunchy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f6002",
    slug: "chicken-thigh-piece",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "Chicken Thigh Piece",

    images: [new URL("../assets/menu/fried chicken/chicken thigh piece.webp", import.meta.url).href],

    shortDescription:
      "A juicy, crispy fried chicken thigh marinated with signature herbs and spices.",

    longDescription:
      "Our Chicken Thigh Piece is made from premium fresh chicken, marinated in a secret blend of herbs and spices before being coated in our signature crispy breading. Pressure-fried until golden brown, it offers an irresistible crunchy exterior with tender, juicy dark meat inside. Rich in flavor and perfectly seasoned, it's an ideal choice for anyone who loves succulent fried chicken.",

    price: {
      originalPrice: 329,
      discountPercentage: 0,
      discountedPrice: 329,
    },

    variations: [],

    addons: [
      {
        name: "Extra Dip",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
      {
        name: "Soft Drink",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Thigh",
      "Wheat Flour",
      "Signature Spice Blend",
      "Black Pepper",
      "Paprika",
      "Garlic Powder",
      "Onion Powder",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 390,
    },

    spiceLevel: 2,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Customer Favorite", "Crispy", "Freshly Fried"],

    tags: ["Fried Chicken", "Chicken Thigh", "Juicy", "Crunchy", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f6003",
    slug: "5-hot-wings",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "5 Hot Wings",

    images: [new URL("../assets/menu/fried chicken/5 hot wings.webp", import.meta.url).href],

    shortDescription:
      "Five crispy, spicy chicken wings coated with BiteX's signature hot seasoning.",

    longDescription:
      "Our 5 Hot Wings are marinated in a bold blend of herbs and fiery spices before being coated in our signature crispy breading and fried to golden perfection. Each wing delivers a crunchy exterior with juicy, tender meat inside. Packed with smoky heat and irresistible flavor, these wings are perfect as a snack, appetizer, or a satisfying meal for spice lovers.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Dip",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
      {
        name: "Soft Drink",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Wings",
      "Wheat Flour",
      "Signature Hot Spice Blend",
      "Paprika",
      "Cayenne Pepper",
      "Garlic Powder",
      "Onion Powder",
      "Black Pepper",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 520,
    },

    spiceLevel: 4,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Spicy", "Best Seller", "Freshly Fried"],

    tags: ["Fried Chicken", "Hot Wings", "Spicy", "Crispy", "Snack"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f6004",
    slug: "10-hot-wings",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "10 Hot Wings",

    images: [new URL("../assets/menu/fried chicken/10 hot wings.webp", import.meta.url).href],

    shortDescription:
      "Ten crispy, spicy chicken wings coated with BiteX's signature hot seasoning.",

    longDescription:
      "Our 10 Hot Wings are marinated in a flavorful blend of herbs and fiery spices before being coated in our signature crispy breading and fried until perfectly golden. Served as a generous portion of ten wings, they're crunchy on the outside, juicy on the inside, and bursting with smoky, spicy flavor. Perfect for sharing with friends or satisfying serious wing cravings.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Extra Dip",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
      {
        name: "Soft Drink",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Wings",
      "Wheat Flour",
      "Signature Hot Spice Blend",
      "Paprika",
      "Cayenne Pepper",
      "Garlic Powder",
      "Onion Powder",
      "Black Pepper",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 1040,
    },

    spiceLevel: 4,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Perfect for Sharing", "Spicy"],

    tags: ["Fried Chicken", "Hot Wings", "Spicy", "Sharing", "Crispy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f6005",
    slug: "10-bbq-wings",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "10 BBQ Wings",

    images: [new URL("../assets/menu/fried chicken/10 BBQ wings.webp", import.meta.url).href],

    shortDescription:
      "Ten crispy chicken wings coated in BiteX's signature smoky BBQ glaze.",

    longDescription:
      "Our 10 BBQ Wings are marinated in a special blend of herbs and spices before being fried to a perfect golden crisp. Each wing is generously coated in our rich, smoky BBQ sauce, delivering a delicious balance of sweet, tangy, and savory flavors. Served as a generous portion of ten wings, they're perfect for sharing with family and friends or satisfying a serious BBQ craving.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Extra BBQ Sauce",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
      {
        name: "Soft Drink",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Wings",
      "BBQ Sauce",
      "Wheat Flour",
      "Garlic Powder",
      "Onion Powder",
      "Paprika",
      "Black Pepper",
      "Brown Sugar",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 1120,
    },

    spiceLevel: 1,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "BBQ Favorite", "Perfect for Sharing"],

    tags: ["Fried Chicken", "BBQ Wings", "Smoky", "Sharing", "Crispy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f6006",
    slug: "10-chicken-nuggets",

    categoryId: CATEGORY_IDS.FRIED_CHICKEN,
    title: "10 Chicken Nuggets",

    images: [new URL("../assets/menu/fried chicken/10 chicken nuggets.webp", import.meta.url).href],

    shortDescription:
      "Ten golden crispy chicken nuggets made with tender premium chicken breast.",

    longDescription:
      "Our 10 Chicken Nuggets are made from premium chicken breast, seasoned with a blend of herbs and spices, coated in a light crispy breadcrumb crust, and fried until perfectly golden. Crunchy on the outside and tender on the inside, these bite-sized nuggets are served fresh and pair perfectly with your favorite dipping sauce. They're ideal for sharing, snacking, or enjoying as a satisfying meal.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Extra Garlic Dip",
        price: 49,
      },
      {
        name: "Extra BBQ Sauce",
        price: 49,
      },
      {
        name: "French Fries",
        price: 199,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Breadcrumbs",
      "Wheat Flour",
      "Garlic Powder",
      "Onion Powder",
      "Black Pepper",
      "Paprika",
      "Salt",
      "Vegetable Oil",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 860,
    },

    spiceLevel: 1,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Kids' Favorite", "Best Seller", "Perfect for Sharing"],

    tags: ["Chicken", "Nuggets", "Crispy", "Snack", "Sharing"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Fries and sides
  {
    id: "f7001",
    slug: "small-fries",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Small Fries",

    images: [new URL("../assets/menu/fries and sides/small fries.webp", import.meta.url).href],

    shortDescription:
      "Golden crispy French fries lightly seasoned with BiteX's signature seasoning.",

    longDescription:
      "Our Small Fries are made from premium-quality potatoes, cut fresh and fried until perfectly golden and crispy. Lightly seasoned with BiteX's signature blend of salt and spices, they offer a fluffy interior with a satisfying crunch on the outside. Whether enjoyed on their own or paired with your favorite burger or fried chicken, these fries are the perfect side for any meal.",

    price: {
      originalPrice: 249,
      discountPercentage: 0,
      discountedPrice: 249,
    },

    variations: [],

    addons: [
      {
        name: "Cheese Dip",
        price: 79,
      },
      {
        name: "Garlic Mayo",
        price: 49,
      },
      {
        name: "BBQ Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Potatoes",
      "Vegetable Oil",
      "Salt",
      "Black Pepper",
      "Signature Fry Seasoning",
    ],

    allergens: [],

    nutrition: {
      calories: 340,
    },

    spiceLevel: 0,

    preparationTime: "6-8 min",

    available: true,

    badges: ["Best Seller", "Crispy", "Fresh Cut"],

    tags: ["Fries", "Sides", "Crispy", "Potato", "Snack"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7002",
    slug: "medium-fries",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Medium Fries",

    images: [new URL("../assets/menu/fries and sides/medium fries.webp", import.meta.url).href],

    shortDescription:
      "A generous serving of crispy golden French fries seasoned with BiteX's signature spices.",

    longDescription:
      "Our Medium Fries are prepared from premium-quality potatoes, freshly cut and fried until perfectly golden with a crispy exterior and fluffy interior. Lightly coated with BiteX's signature seasoning blend, they deliver the perfect balance of crunch and flavor. Ideal for sharing or enjoying alongside your favorite burger, pizza, or fried chicken meal.",

    price: {
      originalPrice: 349,
      discountPercentage: 0,
      discountedPrice: 349,
    },

    variations: [],

    addons: [
      {
        name: "Cheese Dip",
        price: 79,
      },
      {
        name: "Garlic Mayo",
        price: 49,
      },
      {
        name: "BBQ Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Potatoes",
      "Vegetable Oil",
      "Salt",
      "Black Pepper",
      "Signature Fry Seasoning",
    ],

    allergens: [],

    nutrition: {
      calories: 490,
    },

    spiceLevel: 0,

    preparationTime: "6-8 min",

    available: true,

    badges: ["Best Seller", "Fresh Cut", "Perfect for Sharing"],

    tags: ["Fries", "Sides", "Crispy", "Golden", "Potato"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7003",
    slug: "large-fries",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Large Fries",

    images: [new URL("../assets/menu/fries and sides/large fries.webp", import.meta.url).href],

    shortDescription:
      "A large serving of golden crispy French fries seasoned with BiteX's signature spice blend.",

    longDescription:
      "Our Large Fries are made from premium farm-fresh potatoes, freshly cut and fried until perfectly golden. Crispy on the outside and fluffy on the inside, they're lightly coated with BiteX's signature seasoning for the perfect balance of flavor. Whether you're sharing with friends or enjoying them as a meal companion, these generously portioned fries deliver freshness, crunch, and satisfaction in every bite.",

    price: {
      originalPrice: 549,
      discountPercentage: 0,
      discountedPrice: 549,
    },

    variations: [],

    addons: [
      {
        name: "Cheese Dip",
        price: 79,
      },
      {
        name: "Garlic Mayo",
        price: 49,
      },
      {
        name: "BBQ Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Potatoes",
      "Vegetable Oil",
      "Salt",
      "Black Pepper",
      "Signature Fry Seasoning",
    ],

    allergens: [],

    nutrition: {
      calories: 720,
    },

    spiceLevel: 0,

    preparationTime: "6-8 min",

    available: true,

    badges: ["Best Seller", "Perfect for Sharing", "Fresh Cut"],

    tags: ["Fries", "Sides", "Crispy", "Golden", "Sharing"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7004",
    slug: "mayo-fries",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Mayo Fries",

    images: [new URL("../assets/menu/fries and sides/mayo fries.webp", import.meta.url).href],

    shortDescription:
      "Golden crispy fries topped with creamy mayonnaise and BiteX signature seasoning.",

    longDescription:
      "Our Mayo Fries feature freshly cut premium potatoes fried until perfectly golden and crispy, then generously drizzled with rich, creamy mayonnaise. Finished with BiteX's signature seasoning and a sprinkle of herbs, every bite offers the perfect combination of crunchy fries and smooth, flavorful mayo. A customer favorite that's perfect as a snack or side dish.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Mayonnaise",
        price: 49,
      },
      {
        name: "Cheese Sauce",
        price: 79,
      },
      {
        name: "Jalapeños",
        price: 59,
      },
    ],

    ingredients: [
      "Potatoes",
      "Mayonnaise",
      "Vegetable Oil",
      "Salt",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Fry Seasoning",
    ],

    allergens: ["Egg"],

    nutrition: {
      calories: 690,
    },

    spiceLevel: 0,

    preparationTime: "8-10 min",

    available: true,

    badges: ["Customer Favorite", "Creamy", "Best Seller"],

    tags: ["Fries", "Mayonnaise", "Creamy", "Sides", "Snack"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7005",
    slug: "loaded-fries",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Loaded Fries",

    images: [new URL("../assets/menu/fries and sides/loaded fries.webp", import.meta.url).href],

    shortDescription:
      "Crispy fries loaded with chicken, melted cheese, sauces, and premium toppings.",

    longDescription:
      "Our Loaded Fries are the ultimate indulgence for fry lovers. Freshly cut golden fries are topped with juicy crispy chicken bites, rich melted mozzarella and cheddar cheese, jalapeños, fresh spring onions, and a generous drizzle of BiteX Signature Sauce, garlic mayo, and smoky BBQ sauce. Every bite delivers the perfect combination of crunchy fries, tender chicken, creamy cheese, and bold flavors, making it a complete meal rather than just a side dish.",

    price: {
      originalPrice: 899,
      discountPercentage: 0,
      discountedPrice: 899,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 149,
      },
      {
        name: "Extra Jalapeños",
        price: 59,
      },
    ],

    ingredients: [
      "French Fries",
      "Crispy Chicken",
      "Mozzarella Cheese",
      "Cheddar Cheese",
      "Jalapeños",
      "Spring Onions",
      "Garlic Mayo",
      "BBQ Sauce",
      "BiteX Signature Sauce",
      "Signature Fry Seasoning",
    ],

    allergens: ["Milk", "Egg", "Gluten"],

    nutrition: {
      calories: 1280,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Signature", "Best Seller", "Cheese Lover", "Loaded"],

    tags: ["Loaded Fries", "Chicken", "Cheesy", "Premium", "Sharing"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7006",
    slug: "bitex-special-soup",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "BiteX Special Soup",

    images: [new URL("../assets/menu/fries and sides/biteX special soup.webp", import.meta.url).href],

    shortDescription:
      "Our signature premium soup loaded with chicken, vegetables, egg, and authentic Asian flavors.",

    longDescription:
      "The BiteX Special Soup is our house specialty, prepared with tender shredded chicken, mushrooms, carrots, cabbage, sweet corn, spring onions, and silky egg ribbons simmered in a rich, flavorful broth. Infused with aromatic herbs, black pepper, soy sauce, garlic, and our signature seasoning, this hearty soup delivers warmth, comfort, and a satisfying combination of textures. Perfect for sharing or enjoying as a wholesome meal on its own.",

    price: {
      originalPrice: 899,
      discountPercentage: 0,
      discountedPrice: 899,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Egg",
        price: 99,
      },
      {
        name: "Extra Crackers",
        price: 49,
      },
    ],

    ingredients: [
      "Chicken",
      "Egg",
      "Mushrooms",
      "Sweet Corn",
      "Carrots",
      "Cabbage",
      "Spring Onions",
      "Garlic",
      "Ginger",
      "Soy Sauce",
      "Black Pepper",
      "Corn Flour",
      "Signature Seasoning",
    ],

    allergens: ["Egg", "Soy", "Gluten"],

    nutrition: {
      calories: 540,
    },

    spiceLevel: 2,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Signature", "Best Seller", "Chef's Special"],

    tags: ["Soup", "Chicken", "Comfort Food", "Premium", "Signature"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7007",
    slug: "hot-and-sour-soup",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Hot and Sour Soup",

    images: [new URL("../assets/menu/fries and sides/hot and sour soup.webp", import.meta.url).href],

    shortDescription:
      "A classic Chinese soup with tender chicken, fresh vegetables, and the perfect balance of spicy and tangy flavors.",

    longDescription:
      "Our Hot and Sour Soup is crafted with tender shredded chicken, mushrooms, carrots, cabbage, bamboo shoots, egg ribbons, and spring onions simmered in a rich chicken broth. Flavored with soy sauce, vinegar, black pepper, chili, and aromatic spices, it delivers the perfect harmony of heat and tanginess. Every bowl is hearty, comforting, and packed with authentic Asian flavors that make it an ideal starter or light meal.",

    price: {
      originalPrice: 849,
      discountPercentage: 0,
      discountedPrice: 849,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Egg",
        price: 99,
      },
      {
        name: "Extra Crackers",
        price: 49,
      },
    ],

    ingredients: [
      "Chicken",
      "Egg",
      "Mushrooms",
      "Carrots",
      "Cabbage",
      "Bamboo Shoots",
      "Spring Onions",
      "Garlic",
      "Ginger",
      "Soy Sauce",
      "Vinegar",
      "Black Pepper",
      "Red Chili",
      "Corn Flour",
    ],

    allergens: ["Egg", "Soy", "Gluten"],

    nutrition: {
      calories: 480,
    },

    spiceLevel: 4,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Spicy", "Best Seller", "Classic Chinese"],

    tags: ["Soup", "Chinese", "Hot & Sour", "Spicy", "Comfort Food"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f7008",
    slug: "vegetable-soup",

    categoryId: CATEGORY_IDS.FRIES_AND_SIDES,
    title: "Vegetable Soup",

    images: [new URL("../assets/menu/fries and sides/vegetable soup.webp", import.meta.url).href],

    shortDescription:
      "A wholesome soup made with fresh vegetables, aromatic herbs, and a flavorful broth.",

    longDescription:
      "Our Vegetable Soup is a nourishing blend of fresh carrots, cabbage, mushrooms, sweet corn, green beans, peas, spring onions, and garlic simmered in a rich vegetable broth. Enhanced with aromatic herbs, black pepper, and signature seasonings, every bowl delivers comforting warmth and natural flavors. Light yet satisfying, it's the perfect choice for anyone looking for a healthy, delicious starter or a comforting meal.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Extra Vegetables",
        price: 99,
      },
      {
        name: "Extra Crackers",
        price: 49,
      },
      {
        name: "Cheese Toast",
        price: 149,
      },
    ],

    ingredients: [
      "Carrots",
      "Cabbage",
      "Mushrooms",
      "Sweet Corn",
      "Green Beans",
      "Green Peas",
      "Spring Onions",
      "Garlic",
      "Ginger",
      "Vegetable Broth",
      "Black Pepper",
      "Mixed Herbs",
      "Corn Flour",
    ],

    allergens: ["Gluten"],

    nutrition: {
      calories: 290,
    },

    spiceLevel: 1,

    preparationTime: "15-20 min",

    available: true,

    badges: ["Healthy Choice", "Vegetarian", "Freshly Prepared"],

    tags: ["Soup", "Vegetarian", "Healthy", "Comfort Food", "Fresh"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Pasta
  {
    id: "f9001",
    slug: "cheese-pasta",

    categoryId: CATEGORY_IDS.PASTA,
    title: "Cheese Pasta",

    images: [new URL("../assets/menu/pasta/cheese pasta.webp", import.meta.url).href],

    shortDescription:
      "Creamy cheese pasta tossed in a rich, velvety sauce with herbs and premium seasonings.",

    longDescription:
      "Our Cheese Pasta is made with perfectly cooked premium pasta coated in a rich and creamy blend of mozzarella, cheddar, and parmesan cheese. Infused with garlic, butter, fresh herbs, and BiteX's signature seasoning, every bite delivers a smooth, cheesy, and comforting flavor. Finished with a sprinkle of parmesan and herbs, this dish is perfect for cheese lovers seeking a satisfying and indulgent meal.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 149,
      },
      {
        name: "Grilled Chicken",
        price: 199,
      },
      {
        name: "Garlic Bread",
        price: 149,
      },
    ],

    ingredients: [
      "Pasta",
      "Mozzarella Cheese",
      "Cheddar Cheese",
      "Parmesan Cheese",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Black Pepper",
      "Mixed Herbs",
      "Parsley",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 860,
    },

    spiceLevel: 0,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Cheese Lover", "Creamy", "Best Seller"],

    tags: ["Pasta", "Cheesy", "Creamy", "Italian", "Comfort Food"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f9002",
    slug: "alfredo-pasta",

    categoryId: CATEGORY_IDS.PASTA,
    title: "Alfredo Pasta",

    images: [new URL("../assets/menu/pasta/alfredo pasta.webp", import.meta.url).href],

    shortDescription:
      "Creamy Alfredo pasta with tender chicken, parmesan cheese, and aromatic herbs.",

    longDescription:
      "Our Alfredo Pasta is prepared with perfectly cooked premium pasta tossed in a rich, velvety Alfredo sauce made from fresh cream, butter, parmesan cheese, and garlic. Tender grilled chicken pieces are added for extra flavor and protein, then finished with mixed herbs, cracked black pepper, and freshly grated parmesan. Every bite is smooth, creamy, and packed with authentic Italian-inspired flavors that make this dish a customer favorite.",

    price: {
      originalPrice: 799,
      discountPercentage: 0,
      discountedPrice: 799,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Parmesan",
        price: 149,
      },
      {
        name: "Garlic Bread",
        price: 149,
      },
    ],

    ingredients: [
      "Pasta",
      "Grilled Chicken",
      "Fresh Cream",
      "Butter",
      "Parmesan Cheese",
      "Garlic",
      "Black Pepper",
      "Mixed Herbs",
      "Parsley",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 920,
    },

    spiceLevel: 1,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Best Seller", "Creamy", "Italian Classic"],

    tags: ["Pasta", "Alfredo", "Chicken", "Creamy", "Italian"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f9003",
    slug: "creamy-chicken-pasta",

    categoryId: CATEGORY_IDS.PASTA,
    title: "Creamy Chicken Pasta",

    images: [new URL("../assets/menu/pasta/creamy chicken pasta.webp", import.meta.url).href],

    shortDescription:
      "Creamy pasta loaded with tender grilled chicken, rich cheese, and aromatic herbs.",

    longDescription:
      "Our Creamy Chicken Pasta is crafted with premium pasta tossed in a luxurious cream sauce made from fresh cream, butter, mozzarella, and parmesan cheese. Tender grilled chicken strips are combined with sautéed garlic, mushrooms, and herbs to create a rich, velvety dish bursting with flavor. Finished with freshly grated parmesan and parsley, this indulgent pasta is the perfect choice for anyone craving a hearty and satisfying meal.",

    price: {
      originalPrice: 949,
      discountPercentage: 0,
      discountedPrice: 949,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 149,
      },
      {
        name: "Garlic Bread",
        price: 149,
      },
    ],

    ingredients: [
      "Pasta",
      "Grilled Chicken",
      "Fresh Cream",
      "Mozzarella Cheese",
      "Parmesan Cheese",
      "Butter",
      "Mushrooms",
      "Garlic",
      "Black Pepper",
      "Mixed Herbs",
      "Parsley",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 980,
    },

    spiceLevel: 1,

    preparationTime: "18-20 min",

    available: true,

    badges: ["Best Seller", "Creamy", "High Protein", "Chef's Favorite"],

    tags: ["Pasta", "Chicken", "Creamy", "Italian", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f9004",
    slug: "crunchy-pasta",

    categoryId: CATEGORY_IDS.PASTA,
    title: "Crunchy Pasta",

    images: [new URL("../assets/menu/pasta/crunchy pasta.webp", import.meta.url).href],

    shortDescription:
      "Creamy pasta topped with crispy golden chicken, melted cheese, and signature seasonings.",

    longDescription:
      "Our Crunchy Pasta combines perfectly cooked premium pasta with a rich, creamy cheese sauce made from fresh cream, mozzarella, and parmesan. It's topped with crispy golden fried chicken strips that add an irresistible crunch to every bite. Finished with garlic, herbs, parmesan cheese, and BiteX's signature seasoning, this indulgent dish delivers the perfect contrast between creamy pasta and crispy chicken, making it one of our most satisfying meals.",

    price: {
      originalPrice: 999,
      discountPercentage: 0,
      discountedPrice: 999,
    },

    variations: [],

    addons: [
      {
        name: "Extra Crispy Chicken",
        price: 249,
      },
      {
        name: "Extra Cheese",
        price: 149,
      },
      {
        name: "Garlic Bread",
        price: 149,
      },
    ],

    ingredients: [
      "Pasta",
      "Crispy Chicken",
      "Fresh Cream",
      "Mozzarella Cheese",
      "Parmesan Cheese",
      "Butter",
      "Garlic",
      "Black Pepper",
      "Mixed Herbs",
      "Parsley",
      "Breadcrumbs",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 1120,
    },

    spiceLevel: 2,

    preparationTime: "18-22 min",

    available: true,

    badges: ["Signature", "Best Seller", "Crunchy", "High Protein"],

    tags: ["Pasta", "Crispy Chicken", "Creamy", "Cheesy", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f9005",
    slug: "spicy-penne-pasta",

    categoryId: CATEGORY_IDS.PASTA,
    title: "Spicy Penne Pasta",

    images: [new URL("../assets/menu/pasta/spicy penne pasta.webp", import.meta.url).href],

    shortDescription:
      "Penne pasta tossed in a spicy tomato sauce with grilled chicken, herbs, and parmesan cheese.",

    longDescription:
      "Our Spicy Penne Pasta features perfectly cooked penne pasta tossed in a bold, spicy tomato sauce infused with garlic, chili flakes, herbs, and BiteX's signature seasoning. Tender grilled chicken pieces, fresh bell peppers, onions, and parmesan cheese create a delicious combination of heat and savory flavor. Finished with parsley and freshly grated parmesan, this dish is perfect for guests who enjoy rich Italian flavors with a spicy kick.",

    price: {
      originalPrice: 949,
      discountPercentage: 0,
      discountedPrice: 949,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Parmesan",
        price: 149,
      },
      {
        name: "Garlic Bread",
        price: 149,
      },
    ],

    ingredients: [
      "Penne Pasta",
      "Grilled Chicken",
      "Tomato Sauce",
      "Parmesan Cheese",
      "Bell Peppers",
      "Onions",
      "Garlic",
      "Chili Flakes",
      "Black Pepper",
      "Mixed Herbs",
      "Parsley",
      "Olive Oil",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 910,
    },

    spiceLevel: 4,

    preparationTime: "18-20 min",

    available: true,

    badges: ["Spicy", "Best Seller", "Italian Classic", "High Protein"],

    tags: ["Pasta", "Penne", "Spicy", "Chicken", "Italian"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Shawarma and wraps
  {
    id: "f10001",
    slug: "chicken-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Chicken Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/chicken shawarma.webp", import.meta.url).href],

    shortDescription:
      "Juicy marinated chicken wrapped in soft pita with fresh vegetables and garlic sauce.",

    longDescription:
      "Our Chicken Shawarma is prepared with tender chicken marinated for hours in a blend of Middle Eastern spices, then grilled to perfection for a smoky, juicy flavor. Wrapped in freshly baked pita bread with crisp lettuce, tomatoes, onions, pickles, and creamy garlic sauce, it's finished with BiteX's signature seasoning for a delicious balance of freshness and bold flavor in every bite.",

    price: {
      originalPrice: 299,
      discountPercentage: 0,
      discountedPrice: 299,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 149,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Pita Bread",
      "Marinated Chicken",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Garlic Sauce",
      "Black Pepper",
      "Middle Eastern Spices",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg"],

    nutrition: {
      calories: 520,
    },

    spiceLevel: 2,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Best Seller", "Freshly Grilled", "Customer Favorite"],

    tags: ["Shawarma", "Wrap", "Chicken", "Middle Eastern", "Grilled"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10002",
    slug: "chicken-cheese-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Chicken Cheese Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/chicken cheese shawarma.webp", import.meta.url).href],

    shortDescription:
      "Juicy grilled chicken wrapped with melted cheese, fresh vegetables, and creamy garlic sauce.",

    longDescription:
      "Our Chicken Cheese Shawarma features tender chicken marinated in authentic Middle Eastern spices and grilled to perfection. Wrapped in soft pita bread with melted mozzarella cheese, crisp lettuce, tomatoes, onions, pickles, and our signature garlic sauce, this shawarma delivers the perfect combination of smoky chicken, creamy cheese, and fresh vegetables. Every bite is rich, satisfying, and packed with bold flavors.",

    price: {
      originalPrice: 349,
      discountPercentage: 0,
      discountedPrice: 349,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 149,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Pita Bread",
      "Marinated Chicken",
      "Mozzarella Cheese",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Garlic Sauce",
      "Black Pepper",
      "Middle Eastern Spices",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten", "Egg"],

    nutrition: {
      calories: 620,
    },

    spiceLevel: 2,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Best Seller", "Cheese Lover", "Freshly Grilled"],

    tags: ["Shawarma", "Wrap", "Chicken", "Cheesy", "Middle Eastern"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10003",
    slug: "veggie-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Veggie Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/veggie shawarma.webp", import.meta.url).href],

    shortDescription:
      "Fresh vegetables wrapped in soft pita with creamy garlic sauce and signature seasonings.",

    longDescription:
      "Our Veggie Shawarma is a delicious vegetarian wrap filled with freshly grilled bell peppers, mushrooms, onions, lettuce, tomatoes, cabbage, sweet corn, and pickles. Wrapped in warm pita bread with creamy garlic sauce and BiteX's signature Middle Eastern seasoning, this wholesome wrap offers the perfect balance of freshness, crunch, and savory flavor. It's a light yet satisfying choice for anyone craving a meat-free meal.",

    price: {
      originalPrice: 299,
      discountPercentage: 0,
      discountedPrice: 299,
    },

    variations: [],

    addons: [
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
      {
        name: "Jalapeños",
        price: 59,
      },
    ],

    ingredients: [
      "Pita Bread",
      "Bell Peppers",
      "Mushrooms",
      "Onions",
      "Lettuce",
      "Tomatoes",
      "Cabbage",
      "Sweet Corn",
      "Pickles",
      "Garlic Sauce",
      "Middle Eastern Spices",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg"],

    nutrition: {
      calories: 410,
    },

    spiceLevel: 1,

    preparationTime: "8-10 min",

    available: true,

    badges: ["Vegetarian", "Fresh", "Healthy Choice"],

    tags: ["Shawarma", "Wrap", "Vegetarian", "Fresh", "Healthy"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10004",
    slug: "special-kabab-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Special Kabab Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/special kabab shawarma.webp", import.meta.url).href],

    shortDescription:
      "Juicy seekh kabab wrapped in soft pita with fresh vegetables, garlic sauce, and signature spices.",

    longDescription:
      "Our Special Kabab Shawarma is made with tender, smoky seekh kabab grilled to perfection and wrapped in freshly baked pita bread. Filled with crisp lettuce, tomatoes, onions, pickles, and creamy garlic sauce, it's finished with BiteX's signature Middle Eastern seasoning for a bold and satisfying flavor. Every bite delivers the perfect combination of juicy kabab, fresh vegetables, and rich, creamy sauce.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Kabab",
        price: 149,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Pita Bread",
      "Seekh Kabab",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Garlic Sauce",
      "Black Pepper",
      "Middle Eastern Spices",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg"],

    nutrition: {
      calories: 610,
    },

    spiceLevel: 3,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Chef's Special", "Best Seller", "Freshly Grilled"],

    tags: ["Shawarma", "Wrap", "Kabab", "Grilled", "Signature"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10005",
    slug: "chicken-paratha-roll",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Chicken Paratha Roll",

    images: [new URL("../assets/menu/shawarma and wraps/chicken paratha roll.webp", import.meta.url).href],

    shortDescription:
      "Tender grilled chicken wrapped in a flaky paratha with fresh vegetables and signature sauces.",

    longDescription:
      "Our Chicken Paratha Roll is prepared with juicy marinated chicken grilled to perfection and wrapped in a freshly made flaky paratha. Filled with crisp lettuce, onions, tomatoes, cucumber, and drizzled with creamy garlic mayo and BiteX's signature spicy sauce, this roll delivers the perfect combination of smoky chicken, soft layers of paratha, and fresh crunchy vegetables. A hearty and flavorful meal that's perfect for lunch or dinner.",

    price: {
      originalPrice: 399,
      discountPercentage: 0,
      discountedPrice: 399,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 149,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Paratha",
      "Grilled Chicken",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Cucumber",
      "Garlic Mayo",
      "Signature Spicy Sauce",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg"],

    nutrition: {
      calories: 690,
    },

    spiceLevel: 2,

    preparationTime: "10-12 min",

    available: true,

    badges: ["Best Seller", "Freshly Made", "High Protein"],

    tags: ["Paratha Roll", "Chicken", "Wrap", "Grilled", "Street Food"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10006",
    slug: "zinger-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Zinger Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/zinger Shawarma.webp", import.meta.url).href],

    shortDescription:
      "Crispy zinger fillet wrapped in soft pita with fresh vegetables and signature sauces.",

    longDescription:
      "Our Zinger Shawarma combines a crispy golden fried chicken fillet with soft, freshly baked pita bread for the ultimate crunchy wrap. Layered with crisp lettuce, tomatoes, onions, pickles, creamy garlic mayo, and BiteX's signature spicy sauce, every bite delivers an irresistible mix of crunch, freshness, and bold flavors. It's the perfect fusion of a classic zinger and authentic shawarma, making it one of our most satisfying wraps.",

    price: {
      originalPrice: 449,
      discountPercentage: 0,
      discountedPrice: 449,
    },

    variations: [],

    addons: [
      {
        name: "Extra Zinger Fillet",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Pita Bread",
      "Crispy Zinger Chicken",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Garlic Mayo",
      "Signature Spicy Sauce",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg", "Milk"],

    nutrition: {
      calories: 760,
    },

    spiceLevel: 3,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Crispy", "Customer Favorite", "High Protein"],

    tags: ["Shawarma", "Wrap", "Zinger", "Crispy Chicken", "Fusion"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10007",
    slug: "zinger-paratha-roll",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Zinger Paratha Roll",

    images: [new URL("../assets/menu/shawarma and wraps/zinger paratha roll.webp", import.meta.url).href],

    shortDescription:
      "Crispy zinger fillet wrapped in a flaky paratha with fresh vegetables and signature sauces.",

    longDescription:
      "Our Zinger Paratha Roll features a crispy golden fried chicken fillet wrapped inside a freshly made flaky paratha. Layered with crisp lettuce, onions, tomatoes, cucumber, creamy garlic mayo, and BiteX's signature spicy sauce, this hearty roll delivers the perfect balance of crunch, tenderness, and bold flavors. Every bite combines the richness of buttery paratha with the satisfying crispiness of our signature zinger chicken for an unforgettable meal.",

    price: {
      originalPrice: 499,
      discountPercentage: 0,
      discountedPrice: 499,
    },

    variations: [],

    addons: [
      {
        name: "Extra Zinger Fillet",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Paratha",
      "Crispy Zinger Chicken",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Cucumber",
      "Garlic Mayo",
      "Signature Spicy Sauce",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg", "Milk"],

    nutrition: {
      calories: 840,
    },

    spiceLevel: 3,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Crispy", "High Protein", "Customer Favorite"],

    tags: ["Paratha Roll", "Zinger", "Crispy Chicken", "Wrap", "Street Food"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10008",
    slug: "arabic-shawarma",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Arabic Shawarma",

    images: [new URL("../assets/menu/shawarma and wraps/arabic shawarma.webp", import.meta.url).href],

    shortDescription:
      "Authentic Arabic-style shawarma with juicy grilled chicken, fries, garlic sauce, and soft saj bread.",

    longDescription:
      "Our Arabic Shawarma is inspired by authentic Middle Eastern street food. Tender chicken is marinated in traditional Arabic spices and slow-grilled until perfectly juicy, then wrapped in soft saj bread with crispy fries, pickles, creamy garlic sauce, and a touch of signature seasoning. Grilled until lightly crispy on the outside, this large shawarma delivers smoky, creamy, and savory flavors in every bite, making it one of BiteX's signature wraps.",

    price: {
      originalPrice: 599,
      discountPercentage: 0,
      discountedPrice: 599,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
      {
        name: "Extra Fries Inside",
        price: 99,
      },
    ],

    ingredients: [
      "Saj Bread",
      "Marinated Chicken",
      "French Fries",
      "Garlic Sauce",
      "Pickles",
      "Black Pepper",
      "Middle Eastern Spices",
      "Olive Oil",
      "Parsley",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg"],

    nutrition: {
      calories: 930,
    },

    spiceLevel: 2,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Best Seller", "Authentic Arabic", "High Protein"],

    tags: ["Arabic Shawarma", "Chicken", "Wrap", "Middle Eastern", "Signature"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10009",
    slug: "afghani-wrap",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Afghani Wrap",

    images: [new URL("../assets/menu/shawarma and wraps/afghani wrap.webp", import.meta.url).href],

    shortDescription:
      "Tender Afghani-style grilled chicken wrapped in soft bread with fresh vegetables and creamy Afghani sauce.",

    longDescription:
      "Our Afghani Wrap features succulent chicken marinated in rich Afghani spices, yogurt, cream, garlic, and herbs, then flame-grilled until perfectly tender and juicy. Wrapped in soft flatbread with crisp lettuce, onions, tomatoes, and a generous layer of our signature creamy Afghani sauce, this wrap delivers a mild, smoky, and creamy flavor in every bite. It's a hearty, satisfying meal inspired by authentic Afghan cuisine and crafted with BiteX's premium ingredients.",

    price: {
      originalPrice: 649,
      discountPercentage: 0,
      discountedPrice: 649,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Afghani Sauce",
        price: 59,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
    ],

    ingredients: [
      "Flatbread",
      "Afghani Marinated Chicken",
      "Fresh Cream",
      "Yogurt",
      "Garlic",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Black Pepper",
      "Mixed Herbs",
      "Afghani Spices",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten"],

    nutrition: {
      calories: 890,
    },

    spiceLevel: 1,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Best Seller", "Creamy", "High Protein"],

    tags: ["Afghani", "Wrap", "Chicken", "Creamy", "Grilled"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10010",
    slug: "tender-wrap",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Tender Wrap",

    images: [new URL("../assets/menu/shawarma and wraps/tender wrap.webp", import.meta.url).href],

    shortDescription:
      "Crispy chicken tenders wrapped in soft flatbread with fresh vegetables and signature sauces.",

    longDescription:
      "Our Tender Wrap is made with golden crispy chicken tenders wrapped in soft flatbread and loaded with fresh lettuce, tomatoes, onions, crunchy pickles, and creamy garlic mayo. Finished with BiteX's signature spicy sauce and premium seasonings, this wrap delivers the perfect combination of crispy chicken, fresh vegetables, and bold flavors in every bite. It's a satisfying meal for anyone who loves crispy chicken wraps.",

    price: {
      originalPrice: 699,
      discountPercentage: 0,
      discountedPrice: 699,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken Tenders",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 99,
      },
      {
        name: "Extra Garlic Sauce",
        price: 49,
      },
    ],

    ingredients: [
      "Flatbread",
      "Crispy Chicken Tenders",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Garlic Mayo",
      "Signature Spicy Sauce",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Seasoning",
    ],

    allergens: ["Gluten", "Egg", "Milk"],

    nutrition: {
      calories: 870,
    },

    spiceLevel: 2,

    preparationTime: "12-15 min",

    available: true,

    badges: ["Best Seller", "Crispy", "High Protein", "Customer Favorite"],

    tags: ["Wrap", "Chicken Tenders", "Crispy Chicken", "Flatbread", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f10011",
    slug: "master-wrap",

    categoryId: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    title: "Master Wrap",

    images: [new URL("../assets/menu/shawarma and wraps/master wrap.webp", import.meta.url).href],

    shortDescription:
      "Our ultimate wrap loaded with grilled chicken, crispy chicken, fresh vegetables, cheese, and signature sauces.",

    longDescription:
      "The Master Wrap is BiteX's premium signature wrap, crafted for those with a big appetite. It combines juicy grilled chicken and crispy chicken strips with melted mozzarella cheese, fresh lettuce, tomatoes, onions, pickles, and jalapeños, all wrapped in a soft toasted flatbread. Finished with creamy garlic mayo, smoky BBQ sauce, and BiteX's signature spicy sauce, every bite delivers a perfect balance of smoky, cheesy, crispy, and fresh flavors.",

    price: {
      originalPrice: 749,
      discountPercentage: 0,
      discountedPrice: 749,
    },

    variations: [],

    addons: [
      {
        name: "Extra Chicken",
        price: 199,
      },
      {
        name: "Extra Cheese",
        price: 149,
      },
      {
        name: "Extra Signature Sauce",
        price: 59,
      },
    ],

    ingredients: [
      "Flatbread",
      "Grilled Chicken",
      "Crispy Chicken Strips",
      "Mozzarella Cheese",
      "Lettuce",
      "Tomatoes",
      "Onions",
      "Pickles",
      "Jalapeños",
      "Garlic Mayo",
      "BBQ Sauce",
      "Signature Spicy Sauce",
      "Black Pepper",
      "Mixed Herbs",
      "Signature Seasoning",
    ],

    allergens: ["Milk", "Gluten", "Egg"],

    nutrition: {
      calories: 1080,
    },

    spiceLevel: 3,

    preparationTime: "15-18 min",

    available: true,

    badges: ["Signature", "Best Seller", "Loaded", "High Protein"],

    tags: ["Master Wrap", "Chicken", "Loaded", "Signature", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Steak
  {
    id: "f11001",
    slug: "mexican-chicken-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Mexican Chicken Steak",

    images: [new URL("../assets/menu/steak/mexican chicken steak.webp", import.meta.url).href],

    shortDescription:
      "Flame-grilled chicken steak topped with spicy Mexican sauce, served with sautéed vegetables and fries.",

    longDescription:
      "Our Mexican Chicken Steak features a tender, juicy chicken breast marinated in authentic Mexican herbs and spices before being flame-grilled to perfection. It's topped with our rich house-made Mexican sauce and served alongside golden crispy fries, sautéed seasonal vegetables, and creamy mashed potatoes. Every bite offers a delicious balance of smoky, spicy, and savory flavors, making it one of BiteX's signature premium steak platters.",

    price: {
      originalPrice: 1499,
      discountPercentage: 0,
      discountedPrice: 1499,
    },

    variations: [],

    addons: [
      {
        name: "Extra Steak",
        price: 599,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
      {
        name: "Extra Mexican Sauce",
        price: 99,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Mexican Sauce",
      "Garlic",
      "Butter",
      "Olive Oil",
      "Black Pepper",
      "Paprika",
      "Mexican Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1080,
    },

    spiceLevel: 3,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Signature", "Chef's Special", "High Protein", "Premium"],

    tags: ["Steak", "Chicken", "Mexican", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11002",
    slug: "pepper-chicken-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Pepper Chicken Steak",

    images: [new URL("../assets/menu/steak/pepper chicken steak.webp", import.meta.url).href],

    shortDescription:
      "Flame-grilled chicken steak topped with rich black pepper sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Pepper Chicken Steak features a premium chicken breast marinated in herbs and signature spices before being flame-grilled until perfectly juicy and tender. Finished with our rich, creamy black pepper sauce, it's served alongside crispy golden fries, buttery mashed potatoes, and sautéed seasonal vegetables. The bold pepper flavor combined with the smoky grilled chicken creates a classic steak experience that's both hearty and satisfying.",

    price: {
      originalPrice: 1499,
      discountPercentage: 0,
      discountedPrice: 1499,
    },

    variations: [],

    addons: [
      {
        name: "Extra Steak",
        price: 599,
      },
      {
        name: "Extra Black Pepper Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Black Pepper Sauce",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Cracked Black Pepper",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1060,
    },

    spiceLevel: 2,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Best Seller", "Chef's Special", "Premium", "High Protein"],

    tags: ["Steak", "Chicken", "Black Pepper", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11003",
    slug: "jalapeno-chicken-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Jalapeño Chicken Steak",

    images: [new URL("../assets/menu/steak/jalapeno chicken steak.webp", import.meta.url).href],

    shortDescription:
      "Flame-grilled chicken steak topped with creamy jalapeño sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Jalapeño Chicken Steak is crafted from a premium chicken breast marinated in signature herbs and spices, then flame-grilled until tender and juicy. It's finished with a rich, creamy jalapeño sauce that delivers a smooth, mildly spicy kick. Served with crispy golden fries, buttery mashed potatoes, and freshly sautéed seasonal vegetables, this steak platter offers the perfect combination of creamy, smoky, and spicy flavors for a premium dining experience.",

    price: {
      originalPrice: 1499,
      discountPercentage: 0,
      discountedPrice: 1499,
    },

    variations: [],

    addons: [
      {
        name: "Extra Steak",
        price: 599,
      },
      {
        name: "Extra Jalapeño Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Jalapeño Sauce",
      "Fresh Cream",
      "Mozzarella Cheese",
      "Jalapeños",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1095,
    },

    spiceLevel: 3,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Spicy"],

    tags: ["Steak", "Chicken", "Jalapeño", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11004",

    slug: "mediterranean-chicken-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Mediterranean Chicken Steak",

    images: [new URL("../assets/menu/steak/mediterranean chicken steak.webp", import.meta.url).href],

    shortDescription:
      "Flame-grilled chicken steak topped with creamy Mediterranean herb sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Mediterranean Chicken Steak features a tender, premium chicken breast marinated in aromatic Mediterranean herbs, garlic, olive oil, and signature spices before being flame-grilled to perfection. It's finished with a rich, creamy Mediterranean herb sauce and served with crispy golden fries, buttery mashed potatoes, and freshly sautéed seasonal vegetables. Every bite delivers a balanced combination of smoky grilled chicken, fragrant herbs, and creamy flavors for an elegant premium steak experience.",

    price: {
      originalPrice: 1549,
      discountPercentage: 0,
      discountedPrice: 1549,
    },

    variations: [],

    addons: [
      {
        name: "Extra Steak",
        price: 599,
      },
      {
        name: "Extra Mediterranean Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Mediterranean Herb Sauce",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Oregano",
      "Thyme",
      "Rosemary",
      "Parsley",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1075,
    },

    spiceLevel: 1,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Herb Infused"],

    tags: ["Steak", "Chicken", "Mediterranean", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11005",

    slug: "american-chicken-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "American Chicken Steak",

    images: [new URL("../assets/menu/steak/american chicken steak.webp", import.meta.url).href],

    shortDescription:
      "Flame-grilled chicken steak topped with creamy American-style mushroom sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our American Chicken Steak features a premium chicken breast marinated in signature herbs and spices before being flame-grilled until perfectly tender and juicy. It's topped with a rich American-style mushroom cream sauce made with fresh mushrooms, butter, garlic, and cream. Served alongside crispy golden fries, creamy mashed potatoes, and sautéed seasonal vegetables, this hearty platter delivers comforting flavors and a premium steakhouse experience in every bite.",

    price: {
      originalPrice: 1549,
      discountPercentage: 0,
      discountedPrice: 1549,
    },

    variations: [],

    addons: [
      {
        name: "Extra Steak",
        price: 599,
      },
      {
        name: "Extra Mushroom Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Chicken Breast",
      "Mushroom Cream Sauce",
      "Fresh Mushrooms",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Black Pepper",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1105,
    },

    spiceLevel: 1,

    preparationTime: "20-25 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Customer Favorite"],

    tags: ["Steak", "Chicken", "American", "Mushroom Sauce", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11006",

    slug: "mexican-beef-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Mexican Beef Steak",

    images: [new URL("../assets/menu/steak/mexican beef steak.webp", import.meta.url).href],

    shortDescription:
      "Premium grilled beef steak topped with spicy Mexican sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Mexican Beef Steak is crafted from a premium cut of tender beef, marinated in authentic Mexican herbs, garlic, and signature spices before being flame-grilled to perfection. It's finished with our rich house-made Mexican sauce that delivers a bold, smoky, and mildly spicy flavor. Served alongside crispy golden fries, creamy mashed potatoes, and freshly sautéed seasonal vegetables, this premium steak platter offers a restaurant-quality dining experience with every bite.",

    price: {
      originalPrice: 1999,
      discountPercentage: 0,
      discountedPrice: 1999,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Steak",
        price: 799,
      },
      {
        name: "Extra Mexican Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Premium Beef Steak",
      "Mexican Sauce",
      "Garlic",
      "Butter",
      "Olive Oil",
      "Paprika",
      "Black Pepper",
      "Mexican Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1280,
    },

    spiceLevel: 3,

    preparationTime: "22-28 min",

    available: true,

    badges: ["Signature", "Premium", "Chef's Special", "High Protein"],

    tags: ["Steak", "Beef", "Mexican", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11007",

    slug: "pepper-beef-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Pepper Beef Steak",

    images: [new URL("../assets/menu/steak/pepper beef steak.webp", import.meta.url).href],

    shortDescription:
      "Premium grilled beef steak topped with rich black pepper sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Pepper Beef Steak features a premium cut of tender beef, expertly marinated with signature herbs and spices before being flame-grilled to lock in its natural juices. It's finished with our creamy black pepper sauce made from freshly cracked black pepper, butter, garlic, and fresh cream. Served alongside crispy golden fries, buttery mashed potatoes, and sautéed seasonal vegetables, this steak platter delivers bold flavors and a classic steakhouse experience in every bite.",

    price: {
      originalPrice: 1999,
      discountPercentage: 0,
      discountedPrice: 1999,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Steak",
        price: 799,
      },
      {
        name: "Extra Black Pepper Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Premium Beef Steak",
      "Black Pepper Sauce",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Cracked Black Pepper",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1265,
    },

    spiceLevel: 2,

    preparationTime: "22-28 min",

    available: true,

    badges: ["Best Seller", "Premium", "Chef's Special", "High Protein"],

    tags: ["Steak", "Beef", "Black Pepper", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11008",

    slug: "jalapeno-beef-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Jalapeño Beef Steak",

    images: [new URL("../assets/menu/steak/jalapeno beef steak.webp", import.meta.url).href],

    shortDescription:
      "Premium grilled beef steak topped with creamy jalapeño sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Jalapeño Beef Steak features a premium cut of tender beef, marinated in signature herbs and spices before being flame-grilled to perfection. It's finished with a rich, creamy jalapeño sauce made with fresh jalapeños, cream, and herbs, creating the perfect balance of heat and creaminess. Served alongside crispy golden fries, buttery mashed potatoes, and freshly sautéed seasonal vegetables, this premium steak platter delivers bold flavors and an unforgettable dining experience.",

    price: {
      originalPrice: 1999,
      discountPercentage: 0,
      discountedPrice: 1999,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Steak",
        price: 799,
      },
      {
        name: "Extra Jalapeño Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Premium Beef Steak",
      "Jalapeño Sauce",
      "Fresh Jalapeños",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1295,
    },

    spiceLevel: 3,

    preparationTime: "22-28 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Spicy"],

    tags: ["Steak", "Beef", "Jalapeño", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11009",

    slug: "mediterranean-beef-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "Mediterranean Beef Steak",

    images: [new URL("../assets/menu/steak/mediterranean beef steak.webp", import.meta.url).href],

    shortDescription:
      "Premium grilled beef steak topped with creamy Mediterranean herb sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our Mediterranean Beef Steak features a premium cut of tender beef marinated in aromatic Mediterranean herbs, garlic, olive oil, and signature spices before being flame-grilled to perfection. Finished with a rich, creamy Mediterranean herb sauce, it's served alongside crispy golden fries, buttery mashed potatoes, and freshly sautéed seasonal vegetables. Every bite delivers a delicious combination of juicy beef, fragrant herbs, and creamy flavors for an authentic premium steakhouse experience.",

    price: {
      originalPrice: 2099,
      discountPercentage: 0,
      discountedPrice: 2099,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Steak",
        price: 799,
      },
      {
        name: "Extra Mediterranean Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Premium Beef Steak",
      "Mediterranean Herb Sauce",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Oregano",
      "Thyme",
      "Rosemary",
      "Parsley",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1310,
    },

    spiceLevel: 1,

    preparationTime: "22-28 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Herb Infused"],

    tags: ["Steak", "Beef", "Mediterranean", "Grilled", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },
  {
    id: "f11010",

    slug: "american-beef-steak",

    categoryId: CATEGORY_IDS.STEAK,
    title: "American Beef Steak",

    images: [new URL("../assets/menu/steak/american beef steak.webp", import.meta.url).href],

    shortDescription:
      "Premium grilled beef steak topped with creamy American-style mushroom sauce, served with fries and sautéed vegetables.",

    longDescription:
      "Our American Beef Steak is prepared using a premium cut of tender beef, marinated in signature herbs and spices before being flame-grilled to lock in its natural juices. It's finished with a rich American-style mushroom cream sauce made from fresh mushrooms, butter, garlic, and cream. Served alongside crispy golden fries, creamy mashed potatoes, and freshly sautéed seasonal vegetables, this hearty steak platter delivers comforting flavors and a true premium steakhouse experience.",

    price: {
      originalPrice: 2099,
      discountPercentage: 50,
      discountedPrice: 1049,
    },

    variations: [],

    addons: [
      {
        name: "Extra Beef Steak",
        price: 799,
      },
      {
        name: "Extra Mushroom Sauce",
        price: 99,
      },
      {
        name: "Extra Fries",
        price: 149,
      },
    ],

    ingredients: [
      "Premium Beef Steak",
      "Mushroom Cream Sauce",
      "Fresh Mushrooms",
      "Fresh Cream",
      "Butter",
      "Garlic",
      "Olive Oil",
      "Black Pepper",
      "Mixed Herbs",
      "French Fries",
      "Mashed Potatoes",
      "Carrots",
      "Broccoli",
      "Green Beans",
      "Signature Seasoning",
    ],

    allergens: ["Milk"],

    nutrition: {
      calories: 1325,
    },

    spiceLevel: 1,

    preparationTime: "22-28 min",

    available: true,

    badges: ["Chef's Special", "Premium", "High Protein", "Customer Favorite"],

    tags: ["Steak", "Beef", "American", "Mushroom Sauce", "Premium"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  },

  // Cold drinks
  {
    id: "f12001",

    slug: "bitex-cold-drink",

    categoryId: CATEGORY_IDS.COLD_DRINKS,
    title: "BiteX Cold Drink",

    images: [
      new URL(
        "../assets/menu/cold drinks/BiteX Cold Drink.webp",
        import.meta.url,
      ).href,
    ],

    shortDescription:
      "A chilled cola-style soft drink with lively carbonation, caramel sweetness, and a crisp, refreshing finish.",

    longDescription:
      "BiteX Cold Drink is our signature cola-style refreshment, blending sparkling carbonated water with balanced caramel sweetness and a smooth cola flavor. Served properly chilled, its fine bubbles and clean finish make it the ideal companion for pizzas, burgers, fried chicken, and spicy meals. Choose a 500 ml bottle for one, a 1 L or 1.5 L bottle for sharing, or a 2.25 L bottle for family meals and gatherings.",

    price: {
      originalPrice: 149,
      discountPercentage: 0,
      discountedPrice: 149,
    },

    variations: [
      {
        name: "Size",
        required: true,
        options: [
          {
            label: "500 ml",
            originalPrice: 149,
            discountPercentage: 0,
            discountedPrice: 149,
            calories: 210,
          },
          {
            label: "1 L",
            originalPrice: 229,
            discountPercentage: 0,
            discountedPrice: 229,
            calories: 420,
          },
          {
            label: "1.5 L",
            originalPrice: 299,
            discountPercentage: 0,
            discountedPrice: 299,
            calories: 630,
          },
          {
            label: "2.25 L",
            originalPrice: 399,
            discountPercentage: 0,
            discountedPrice: 399,
            calories: 945,
          },
        ],
      },
    ],

    addons: [],

    ingredients: [
      "Carbonated Water",
      "Sugar",
      "Caramel Colour",
      "Natural Cola Flavouring",
      "Phosphoric Acid",
      "Caffeine",
      "Sodium Benzoate",
    ],

    allergens: [],

    nutrition: {
      servingSize: "500 ml",
      calories: 210,
      carbohydrates: "53 g",
      totalSugars: "53 g",
      sodium: "25 mg",
      caffeine: "48 mg",
    },

    spiceLevel: 0,

    preparationTime: "Ready to serve",

    available: true,

    badges: ["Chilled", "Signature Drink"],

    tags: ["Cold Drink", "Cola", "Carbonated", "Refreshing", "Family Size"],

    ratings: {
      overallRating: 0,
      totalReviews: 0,

      distribution: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      reviews: [],
    },
  }
];

const ratingLabels = ['one', 'two', 'three', 'four', 'five'];

/**
 * Recomputes aggregate rating metadata from reviews so displayed totals cannot drift
 * from the underlying review collection.
 */
const createRatingSummary = (reviews) => {
  const distribution = Object.fromEntries(
    ratingLabels.map((label) => [label, 0]),
  );

  reviews.forEach((review) => {
    const label = ratingLabels[review.stars - 1];

    if (label) {
      distribution[label] += 1;
    }
  });

  const totalReviews = reviews.length;
  const overallRating = totalReviews
    ? Number(
        (
          reviews.reduce((total, review) => total + review.stars, 0) /
          totalReviews
        ).toFixed(1),
      )
    : 0;

  return { overallRating, totalReviews, distribution, reviews };
};

/**
 * Uses the first priced variation as the catalog-card starting price.
 * Products without priced variations retain their explicitly configured base price.
 */
const createBasePrice = (product) => {
  const firstPricedOption = product.variations
    .flatMap((variation) => variation.options)
    .find((option) => option.discountedPrice !== undefined);

  if (!firstPricedOption) return product.price;

  return {
    originalPrice: firstPricedOption.originalPrice,
    discountPercentage: firstPricedOption.discountPercentage,
    discountedPrice: firstPricedOption.discountedPrice,
  };
};

// Resolve category labels and derived commercial metadata once at module initialization.
const catalog = products.map((product) => {
  const category = getCategoryById(product.categoryId);

  return {
    ...product,
    category: category.name,
    price: createBasePrice(product),
    ratings: createRatingSummary(product.ratings.reviews),
  };
});

export default catalog;
