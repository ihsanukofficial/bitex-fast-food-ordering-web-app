import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * itemCount is derived from live product counts (never stored) so it can never drift,
 * mirroring how the frontend's categoriesWithCounts.js derives it from catalog data.
 */
const withItemCounts = async (categories) => {
  const counts = await Product.aggregate([
    { $group: { _id: '$categoryId', count: { $sum: 1 } } },
  ]);
  const countsById = new Map(counts.map(({ _id, count }) => [_id, count]));

  return categories.map((category) => ({
    ...category.toObject(),
    itemCount: countsById.get(category.id) || 0,
  }));
};

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ order: 1, name: 1 });
  res.json({ categories: await withItemCounts(categories) });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  logActivity({
    user: req.user,
    action: 'category.created',
    description: `${req.user.name} created category "${category.name}".`,
    targetType: 'category',
    targetId: category._id,
    targetLabel: category.name,
  });
  res.status(201).json({ category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found.');

  Object.assign(category, req.body);
  await category.save();
  logActivity({
    user: req.user,
    action: 'category.updated',
    description: `${req.user.name} updated category "${category.name}".`,
    targetType: 'category',
    targetId: category._id,
    targetLabel: category.name,
  });
  res.json({ category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found.');

  const inUse = await Product.exists({ categoryId: category.id });
  if (inUse) {
    throw new ApiError(409, 'Cannot delete a category that still has products. Reassign or delete those products first.');
  }

  await category.deleteOne();
  logActivity({
    user: req.user,
    action: 'category.deleted',
    description: `${req.user.name} deleted category "${category.name}".`,
    targetType: 'category',
    targetId: category._id,
    targetLabel: category.name,
  });
  res.status(204).end();
});
