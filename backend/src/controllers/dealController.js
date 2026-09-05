import DealSection from '../models/DealSection.js';
import Product from '../models/Product.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listDealSections = asyncHandler(async (req, res) => {
  const sections = await DealSection.find().sort({ order: 1 }).populate('deals.items.product');
  res.json({ sections });
});

/** Flat view mirroring the frontend's dealCatalog.js = deals.flatMap(section => section.deals). */
export const listFlatDeals = asyncHandler(async (req, res) => {
  const sections = await DealSection.find().sort({ order: 1 }).populate('deals.items.product');
  const deals = sections.flatMap((section) => section.deals);
  res.json({ deals });
});

/** Powers the Deal Detail page — mirrors getProductBySlug's single-resource shape. */
export const getDealById = asyncHandler(async (req, res) => {
  const section = await DealSection.findOne({ 'deals.id': req.params.id }).populate(
    'deals.items.product',
  );
  const deal = section?.deals.find((entry) => entry.id === req.params.id);
  if (!deal) throw new ApiError(404, 'Deal not found.');
  res.json({ deal });
});

export const createDealSection = asyncHandler(async (req, res) => {
  const section = await DealSection.create(req.body);
  logActivity({
    user: req.user,
    action: 'deal_section.created',
    description: `${req.user.name} created deal section "${section.title}".`,
    targetType: 'deal_section',
    targetId: section._id,
    targetLabel: section.title,
  });
  res.status(201).json({ section });
});

export const updateDealSection = asyncHandler(async (req, res) => {
  const section = await DealSection.findById(req.params.id);
  if (!section) throw new ApiError(404, 'Deal section not found.');

  Object.assign(section, req.body);
  await section.save();
  logActivity({
    user: req.user,
    action: 'deal_section.updated',
    description: `${req.user.name} updated deal section "${section.title}".`,
    targetType: 'deal_section',
    targetId: section._id,
    targetLabel: section.title,
  });
  res.json({ section });
});

export const deleteDealSection = asyncHandler(async (req, res) => {
  const section = await DealSection.findByIdAndDelete(req.params.id);
  if (!section) throw new ApiError(404, 'Deal section not found.');
  logActivity({
    user: req.user,
    action: 'deal_section.deleted',
    description: `${req.user.name} deleted deal section "${section.title}".`,
    targetType: 'deal_section',
    targetId: section._id,
    targetLabel: section.title,
  });
  res.status(204).end();
});

/** A deal's items must each reference a real, still-existing product — never free text. */
const assertItemsReferenceRealProducts = async (items) => {
  const productIds = (items || []).map((item) => item.product).filter(Boolean);
  if (productIds.length === 0) return;

  const count = await Product.countDocuments({ _id: { $in: productIds } });
  if (count !== new Set(productIds.map(String)).size) {
    throw new ApiError(400, 'One or more selected products no longer exist.');
  }
};

export const upsertDeal = asyncHandler(async (req, res) => {
  const section = await DealSection.findById(req.params.sectionId);
  if (!section) throw new ApiError(404, 'Deal section not found.');

  await assertItemsReferenceRealProducts(req.body.items);

  const { dealId } = req.params;
  const existingIndex = section.deals.findIndex((deal) => deal.id === dealId);
  const dealPayload = { ...req.body, id: dealId };
  const isNew = existingIndex < 0;

  if (existingIndex >= 0) {
    // Merge, not replace — a full replacement would wipe the deal's accumulated
    // ratings.reviews every time an admin edits its name/price/items.
    Object.assign(section.deals[existingIndex], dealPayload);
  } else {
    section.deals.push(dealPayload);
  }

  await section.save();
  await section.populate('deals.items.product');
  logActivity({
    user: req.user,
    action: isNew ? 'deal.created' : 'deal.updated',
    description: `${req.user.name} ${isNew ? 'added' : 'updated'} deal "${dealPayload.name}" in "${section.title}".`,
    targetType: 'deal',
    targetId: dealId,
    targetLabel: dealPayload.name,
  });
  res.json({ section });
});

export const deleteDeal = asyncHandler(async (req, res) => {
  const section = await DealSection.findById(req.params.sectionId);
  if (!section) throw new ApiError(404, 'Deal section not found.');

  const deal = section.deals.find((entry) => entry.id === req.params.dealId);
  section.deals = section.deals.filter((entry) => entry.id !== req.params.dealId);
  await section.save();
  logActivity({
    user: req.user,
    action: 'deal.deleted',
    description: `${req.user.name} deleted deal "${deal?.name || req.params.dealId}" from "${section.title}".`,
    targetType: 'deal',
    targetId: req.params.dealId,
    targetLabel: deal?.name || req.params.dealId,
  });
  res.json({ section });
});
