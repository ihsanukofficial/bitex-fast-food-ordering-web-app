/**
 * One-shot migration: imports the frontend's static src/data/*.js files (plain ESM,
 * runs fine under Node), copies every referenced image into backend/uploads/seed/**
 * (their `new URL(relative, import.meta.url)` resolves to a real file:// path even
 * under Node), and writes the equivalent MongoDB documents. Re-running it replaces
 * catalog/content collections but never touches existing Users or Orders.
 */
import 'dotenv/config';
import { pathToFileURL } from 'node:url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import Category from '../models/Category.js';
import DealSection from '../models/DealSection.js';
import PromoCode from '../models/PromoCode.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import AboutContent from '../models/content/AboutContent.js';
import FooterContent from '../models/content/FooterContent.js';
import HomeContent from '../models/content/HomeContent.js';
import NavigationContent from '../models/content/NavigationContent.js';
import { copySeedAsset } from './copySeedAsset.js';

import catalog from '../../../frontend/src/data/catalog.js';
import categories from '../../../frontend/src/data/categories.js';
import deals from '../../../frontend/src/data/deals.js';
import popularItems from '../../../frontend/src/data/popularItems.js';
import promoCodes from '../../../frontend/src/data/promoCodes.js';
import siteNavigation from '../../../frontend/src/data/siteNavigation.js';
import heroHighlights from '../../../frontend/src/data/heroHighlights.js';
import whyChooseBiteXReasons from '../../../frontend/src/data/whyChooseBiteXReasons.js';
import missionValues from '../../../frontend/src/data/missionValues.js';
import qualityPromises from '../../../frontend/src/data/qualityPromises.js';
import freshIngredientHighlights from '../../../frontend/src/data/freshIngredientHighlights.js';

const heroImage = (name) =>
  copySeedAsset(
    new URL(`../../../frontend/src/components/Hero/HeroImageGallery/heroimages/${name}.webp`, import.meta.url)
      .href,
  );
const galleryImage = (name) =>
  copySeedAsset(new URL(`../../../frontend/src/assets/gallery/${name}`, import.meta.url).href);

const seedProducts = async () => {
  await Product.deleteMany({});
  const documents = catalog.map((product) => ({
    slug: product.slug,
    categoryId: product.categoryId,
    title: product.title,
    images: product.images.map(copySeedAsset),
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    price: product.price,
    variations: product.variations,
    addons: product.addons,
    ingredients: product.ingredients,
    allergens: product.allergens,
    nutrition: product.nutrition,
    spiceLevel: product.spiceLevel,
    preparationTime: product.preparationTime,
    available: product.available,
    badges: product.badges,
    tags: product.tags,
    ratings: product.ratings,
  }));

  // insertMany skips the schema's pre-save price/rating derivation hook, so save()
  // each document individually to keep seeded data on the same code path as admin edits.
  const products = [];
  for (const document of documents) {
    products.push(await new Product(document).save());
  }
  return products;
};

const seedCategories = async () => {
  await Category.deleteMany({});
  const documents = categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    image: copySeedAsset(category.image),
    to: category.to,
    order: index,
  }));
  return Category.insertMany(documents);
};

const seedDealSections = async (products) => {
  const slugToProductId = new Map(products.map((product) => [product.slug, product._id]));

  await DealSection.deleteMany({});
  const documents = deals.map((section, index) => ({
    id: section.id,
    title: section.title,
    navigationLabel: section.navigationLabel,
    eyebrow: section.eyebrow,
    icon: section.icon,
    accent: section.accent,
    tint: section.tint,
    navigationAccent: section.navigationAccent,
    order: index,
    deals: section.deals.map((deal) => ({
      id: deal.id,
      name: deal.name,
      image: copySeedAsset(deal.image),
      price: deal.price,
      items: deal.items
        .map((item) => {
          const productId = slugToProductId.get(item.productSlug);
          if (!productId) {
            console.warn(`Deal "${deal.id}" references unknown product slug "${item.productSlug}" — skipping.`);
            return null;
          }
          return {
            product: productId,
            quantity: item.quantity,
            variationSelections: item.variationSelections || [],
          };
        })
        .filter(Boolean),
    })),
  }));
  return DealSection.insertMany(documents);
};

const seedPromoCodes = async () => {
  await PromoCode.deleteMany({});
  const documents = Object.entries(promoCodes).map(([code, discountPercentage]) => ({
    code,
    discountPercentage,
    active: true,
  }));
  return PromoCode.insertMany(documents);
};

const seedContent = async (products) => {
  const slugToProductId = new Map(products.map((product) => [product.slug, product._id]));
  const popularItemDocs = popularItems
    .map((item) => {
      const slug = item.to.replace('/productdetail/', '');
      const productId = slugToProductId.get(slug);
      return productId ? { product: productId, label: item.label } : null;
    })
    .filter(Boolean);

  await HomeContent.deleteMany({});
  await HomeContent.create({
    hero: {
      eyebrow: 'Fresh. Fast. Full of flavor.',
      headline: 'The Taste You Remember.',
      subHeadline:
        'Your favorite comfort foods, prepared hot and fresh with ingredients you can trust.',
      highlights: heroHighlights,
      images: ['burger', 'fries', 'pizza', 'shawarma', 'pasta'].map(heroImage),
    },
    popularItems: {
      eyebrow: 'BiteX favorites',
      heading: 'Popular right now',
      subtitle: 'Crowd-pleasing picks made hot, fresh, and ready to satisfy.',
      items: popularItemDocs,
    },
    categoriesSection: {
      eyebrow: 'Explore the menu',
      title: 'A craving for every mood',
      subtitle: 'From crispy classics to hearty comfort food, find exactly what sounds good.',
    },
    whyChooseBiteX: {
      eyebrow: '',
      heading: 'Why Choose BiteX?',
      reasons: whyChooseBiteXReasons,
      closingStatement: 'BiteX – Where Every Bite Brings Happiness!',
    },
    cta: {
      heading: 'Ready for Your Next Delicious Bite?',
      description:
        'Explore our wide variety of mouth-watering meals and discover exclusive deals crafted to make every craving worth it.',
    },
  });

  await AboutContent.deleteMany({});
  await AboutContent.create({
    story: {
      eyebrow: 'Our story',
      heading: 'Big flavor began with one simple idea',
      lead: 'Make fast food feel fresh, generous, and genuinely satisfying.',
      description:
        'BiteX was built for people who want more from every meal. We bring together crowd-favorite comfort food, bold recipes, and quick service under one roof—so every craving has a delicious answer.',
      image: galleryImage('1.webp'),
      stats: [
        { value: '100%', label: 'Made to order' },
        { value: String(categories.length), label: 'Food categories' },
        { value: '1', label: 'Promise: great taste' },
      ],
      caption: {
        title: 'Food that brings people together',
        description: 'Served fast. Remembered longer.',
      },
    },
    mission: {
      eyebrow: 'Our mission',
      heading: 'Happiness in every bite',
      intro:
        'Our mission is to serve crave-worthy food with the speed people need and the care they deserve. Every BiteX order should feel easy, exciting, and worth coming back for.',
      values: missionValues,
    },
    qualityPromise: {
      eyebrow: 'The quality promise',
      heading: 'Made right, not just made fast',
      description:
        'Fast food should never mean cutting corners. Our kitchen teams focus on the details that turn familiar favorites into meals you can trust.',
      image: galleryImage('3.webp'),
      promises: qualityPromises,
      note: { title: 'Prepared with care', description: 'Quality you can see in every layer' },
    },
    freshIngredients: {
      eyebrow: 'Fresh ingredients',
      heading: 'Better ingredients make every bite better',
      description:
        'We choose ingredients for freshness, flavor, and the way they work together. Crisp vegetables, tender proteins, soft buns, and signature sauces are prepared to make each meal taste its best.',
      closing: 'No shortcuts. Just honest ingredients and full-on flavor.',
      image: galleryImage('8.webp'),
      highlights: freshIngredientHighlights,
    },
  });

  await FooterContent.deleteMany({});
  await FooterContent.create({
    brandDescription: 'Fresh comfort food, bold flavor, and good moments—made the BiteX way.',
    contact: { address: 'Visit our restaurant', phone: '03xx-xxxxxxx', email: 'info@bitex.com' },
    hours: { days: 'Monday – Sunday', time: '11:00 AM – 12:00 PM' },
    socialLinks: [
      {
        label: 'Follow BiteX on Instagram',
        href: 'https://www.instagram.com/',
        icon: 'ri-instagram-fill',
      },
      {
        label: 'Follow BiteX on Facebook',
        href: 'https://www.facebook.com/',
        icon: 'ri-facebook-box-fill',
      },
      { label: 'Follow BiteX on TikTok', href: 'https://www.tiktok.com/', icon: 'ri-tiktok-fill' },
    ],
  });

  await NavigationContent.deleteMany({});
  await NavigationContent.create({ links: siteNavigation });
};

const seedAdmin = async () => {
  const email = (process.env.SEED_ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || 'BiteX Admin';

  if (!email || !password) {
    console.warn('SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD not set — skipping admin account creation.');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { email },
    { $set: { name, email, passwordHash, role: 'admin', active: true } },
    { upsert: true, setDefaultsOnInsert: true },
  );
  console.log(`Seeded admin account: ${email}`);
};

/**
 * Runs the full migration against whatever database is currently connected.
 * Exported so index.js can reuse it to auto-seed a fresh in-memory dev database,
 * without duplicating this logic or the connect/disconnect lifecycle below.
 */
export const seedDatabase = async () => {
  const products = await seedProducts();
  const seededCategories = await seedCategories();
  const seededDeals = await seedDealSections(products);
  const seededPromoCodes = await seedPromoCodes();
  await seedContent(products);
  await seedAdmin();

  console.log(
    `Seed complete: ${products.length} products, ${seededCategories.length} categories, ` +
      `${seededDeals.length} deal sections, ${seededPromoCodes.length} promo codes, plus home/about/footer/navigation content.`,
  );
};

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  const run = async () => {
    await connectDatabase();
    if (!process.env.MONGODB_URI) {
      console.warn(
        'Seeding an in-memory database: this data disappears as soon as this script exits. ' +
          'Set MONGODB_URI in backend/.env before seeding if you want it to stick around.',
      );
    }

    await seedDatabase();
    await mongoose.disconnect();
    process.exit(0);
  };

  run().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}
