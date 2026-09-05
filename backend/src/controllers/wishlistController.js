import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Wishlist from '../models/Wishlist.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const findOrCreateWishlist = (userId) =>
  Wishlist.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [] } },
    { new: true, upsert: true },
  );

/**
 * Populates and returns the current product list, matching the exact shape /products
 * already returns so the frontend can reuse its existing catalog-card mapping
 * unchanged. Self-heals: a product deleted after being wishlisted populates as null
 * and is dropped here, with the cleanup persisted so it doesn't need to repeat.
 */
const respondWithWishlist = async (res, wishlist, status = 200) => {
  await wishlist.populate('products');
  const validProducts = wishlist.products.filter(Boolean);
  if (validProducts.length !== wishlist.products.length) {
    wishlist.products = validProducts.map((product) => product._id);
    await wishlist.save();
  }
  res.status(status).json({ products: validProducts });
};

export const getMyWishlist = asyncHandler(async (req, res) => {
  const wishlist = await findOrCreateWishlist(req.user._id);
  await respondWithWishlist(res, wishlist);
});

export const addWishlistItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!mongoose.isValidObjectId(productId)) throw new ApiError(400, 'Invalid product.');

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found.');

  const wishlist = await findOrCreateWishlist(req.user._id);
  const alreadyIn = wishlist.products.some((id) => id.equals(product._id));
  if (!alreadyIn) {
    wishlist.products.push(product._id);
    await wishlist.save();
  }

  await respondWithWishlist(res, wishlist, 201);
});

export const removeWishlistItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.isValidObjectId(productId)) throw new ApiError(400, 'Invalid product.');

  const wishlist = await findOrCreateWishlist(req.user._id);
  wishlist.products = wishlist.products.filter((id) => !id.equals(productId));
  await wishlist.save();

  await respondWithWishlist(res, wishlist);
});
