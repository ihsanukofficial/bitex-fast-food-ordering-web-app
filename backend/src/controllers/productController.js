import Product from '../models/Product.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { slugify } from '../utils/slugify.js';

export const listProducts = asyncHandler(async (req, res) => {
  const { categoryId, q } = req.query;
  const filter = {};
  if (categoryId && categoryId !== 'all') filter.categoryId = categoryId;
  if (q?.trim()) {
    const pattern = new RegExp(q.trim(), 'i');
    filter.$or = [{ title: pattern }, { shortDescription: pattern }];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new ApiError(404, 'Product not found.');
  res.json({ product });
});

/**
 * Rejects the zero/negative prices the admin form's numeric inputs default to when left
 * blank — a product without variation pricing relies entirely on this base price.
 * discountedPrice is never checked here: it's always server-derived (see Product.js's
 * pre-validate hook), so originalPrice is the only number the client is trusted for.
 */
const assertValidPrice = (product) => {
  const hasVariationPricing = product.variations?.some((variation) =>
    variation.options?.some((option) => Number(option.originalPrice) > 0),
  );
  if (hasVariationPricing) return;

  if (!(Number(product.price?.originalPrice) > 0)) {
    throw new ApiError(400, 'Set a base price greater than 0, or price it through variations.');
  }
};

/**
 * Slugs are always derived from the title server-side, never accepted from the client —
 * an admin can't type a slug that collides with another product or drifts from the
 * title. Appends -2, -3, ... on collision.
 */
const generateUniqueSlug = async (title) => {
  const base = slugify(title) || 'product';
  let candidate = base;
  let suffix = 2;
  // Sequential by design: each check depends on whether the previous candidate was taken.
  // eslint-disable-next-line no-await-in-loop
  while (await Product.exists({ slug: candidate })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
};

export const createProduct = asyncHandler(async (req, res) => {
  assertValidPrice(req.body);
  const slug = await generateUniqueSlug(req.body.title);
  const product = await Product.create({ ...req.body, slug });
  logActivity({
    user: req.user,
    action: 'product.created',
    description: `${req.user.name} created product "${product.title}".`,
    targetType: 'product',
    targetId: product._id,
    targetLabel: product.title,
  });
  res.status(201).json({ product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found.');

  Object.assign(product, req.body);
  assertValidPrice(product);
  await product.save();
  logActivity({
    user: req.user,
    action: 'product.updated',
    description: `${req.user.name} updated product "${product.title}".`,
    targetType: 'product',
    targetId: product._id,
    targetLabel: product.title,
  });
  res.json({ product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found.');
  logActivity({
    user: req.user,
    action: 'product.deleted',
    description: `${req.user.name} deleted product "${product.title}".`,
    targetType: 'product',
    targetId: product._id,
    targetLabel: product.title,
  });
  res.status(204).end();
});
