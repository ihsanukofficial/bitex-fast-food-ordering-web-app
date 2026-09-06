import Product from '../models/Product.js';
import { logActivity } from '../services/activityLogService.js';
import { getCachedAllProducts, invalidateProductsCache, setCachedAllProducts } from '../services/productCache.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { slugify } from '../utils/slugify.js';

export const listProducts = asyncHandler(async (req, res) => {
  const { categoryId, q, page, limit } = req.query;
  const isUnfilteredFullList = !categoryId || categoryId === 'all';

  // The storefront's own menu/catalog fetch is exactly this shape — no filter, no
  // pagination — so it's the one request worth caching. A category filter, search
  // term, or explicit page/limit always goes straight to MongoDB below.
  if (isUnfilteredFullList && !q?.trim() && !page && !limit) {
    const cached = await getCachedAllProducts();
    if (cached) return res.json({ products: cached });

    const products = await Product.find({}).sort({ createdAt: -1 });
    await setCachedAllProducts(products);
    return res.json({ products });
  }

  const filter = {};
  if (categoryId && categoryId !== 'all') filter.categoryId = categoryId;
  if (q?.trim()) {
    // Escaped so a search term containing regex metacharacters (a stray `(`, `.`,
    // `+`, etc. — easy to type by accident) is matched literally instead of either
    // throwing an invalid-regex error or silently matching something the customer
    // never typed.
    const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escaped, 'i');
    filter.$or = [{ title: pattern }, { shortDescription: pattern }];
  }

  // Pagination is opt-in via page/limit — omitting them keeps the existing
  // "everything that matches the filter" behavior so no current caller breaks.
  if (!page && !limit) {
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json({ products });
  }

  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 20));
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize),
    Product.countDocuments(filter),
  ]);

  res.json({
    products,
    pagination: { page: pageNumber, limit: pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new ApiError(404, 'Product not found.');
  res.json({ product });
});

// Missing entirely is valid — it means the schema's own `default: 0` will apply — so
// this only rejects a value that was actually supplied and is out of range.
const isValidPercentage = (value) =>
  value == null || (Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 100);

/**
 * Enforces the pricingType contract so a product never ends up with two competing
 * prices: a "simple" product's price.amount is the only authoritative number, and a
 * "variation" product's price is null with each price-affecting option owning its own
 * amount. Works against a plain object (createProduct's req.body) or a live Mongoose
 * document (updateProduct's merged product) — plain property reads only, no document
 * methods — since it's called against both.
 */
const assertValidPricing = (product) => {
  if (product.pricingType !== 'simple' && product.pricingType !== 'variation') {
    throw new ApiError(400, "pricingType must be 'simple' or 'variation'.");
  }

  // Addons sum directly onto whichever base/option price wins (see cartPricing.js) with
  // no clamping — a negative addon price would silently create an uncontrolled discount.
  if ((product.addons || []).some((addon) => !(Number(addon.price) >= 0))) {
    throw new ApiError(400, 'Addon prices cannot be negative.');
  }

  const variations = product.variations || [];
  const variationOptions = variations.flatMap((variation) => variation.options || []);

  if (product.pricingType === 'simple') {
    if (!(Number(product.price?.amount) > 0)) {
      throw new ApiError(400, 'Set a base price greater than 0 for a simple-priced product.');
    }
    if (!isValidPercentage(product.price?.discountPercentage)) {
      throw new ApiError(400, 'Discount % must be between 0 and 100.');
    }
    if (variationOptions.some((option) => Number(option.price) > 0)) {
      throw new ApiError(400, 'A simple-priced product cannot have priced variation options.');
    }
    // A simple product is priced once, full stop — the admin UI never offers a
    // Variations section for one, so any variation here (priced or not) can only have
    // arrived through a direct API call, and would be dead weight the storefront never
    // shows a selector for.
    if (variations.length > 0) {
      throw new ApiError(400, 'A simple-priced product cannot have variations. Switch to Variation pricing to add any.');
    }
  } else {
    if (product.price != null) {
      throw new ApiError(400, 'A variation-priced product must not have a base price.');
    }
    // Priced by option.price being set at all (not by value > 0) — a variation option
    // deliberately priced at exactly 0 (e.g. a "Kids" size bundled free) still counts
    // as belonging to the priced variation; it just isn't itself the option that
    // satisfies "at least one option must have a real price" below.
    const pricedVariations = variations.filter((variation) =>
      (variation.options || []).some((option) => option.price != null),
    );
    if (pricedVariations.length === 0) {
      throw new ApiError(400, 'Set a price on at least one variation option.');
    }
    // Exactly one variation may carry pricing — if a customer could pick, say, both a
    // priced Size and a priced Crust, there would be two competing prices for the same
    // line item with no defined way to combine them. A variation that should add extra
    // cost on top of the base price (a crust upgrade, say) belongs in Addons, which
    // already sum on top of whichever price wins — not in a second priced variation.
    if (pricedVariations.length > 1) {
      throw new ApiError(
        400,
        `Only one variation can carry pricing per product — both "${pricedVariations[0].name}" and "${pricedVariations[1].name}" have priced options. Move any extra-cost option into Addons instead.`,
      );
    }
    const pricedVariation = pricedVariations[0];
    // The admin form only ever shows pricing controls on the first variation card, so a
    // priced variation anywhere else would be invisible/uneditable there even though
    // it's the one actually charging customers — keep the data and the UI in sync.
    if (variations[0] !== pricedVariation) {
      throw new ApiError(400, `The priced variation ("${pricedVariation.name}") must be the first variation.`);
    }
    // If the priced variation isn't required, a customer can add this product to the
    // cart having picked nothing from it, and checkout has no price to charge them.
    if (!pricedVariation.required) {
      throw new ApiError(400, `"${pricedVariation.name}" sets this product's price, so it must be marked Required.`);
    }
    const pricedOptions = pricedVariation.options.filter((option) => Number(option.price) > 0);
    if (pricedOptions.length === 0) {
      throw new ApiError(400, 'Set a price on at least one variation option.');
    }
    // Only "at least one option must be positive" is required above — a priced
    // option deliberately set to 0 is legitimate (see the comment above), but a
    // negative one is always a mistake. calculateDiscountedPrice clamps negatives to
    // 0, so an unrejected negative price wouldn't error, it would just silently make
    // that option free — the same uncontrolled-discount risk the addon check guards.
    if (pricedVariation.options.some((option) => option.price != null && Number(option.price) < 0)) {
      throw new ApiError(400, 'Variation option prices cannot be negative.');
    }
    if (pricedVariation.options.some((option) => !isValidPercentage(option.discountPercentage))) {
      throw new ApiError(400, 'Discount % must be between 0 and 100.');
    }
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
  assertValidPricing(req.body);
  const slug = await generateUniqueSlug(req.body.title);
  const product = await Product.create({ ...req.body, slug });
  await invalidateProductsCache();
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
  assertValidPricing(product);
  await product.save();
  await invalidateProductsCache();
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
  await invalidateProductsCache();
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
