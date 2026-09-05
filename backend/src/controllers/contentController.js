import AboutContent from '../models/content/AboutContent.js';
import BrandingContent from '../models/content/BrandingContent.js';
import FooterContent from '../models/content/FooterContent.js';
import HomeContent from '../models/content/HomeContent.js';
import NavigationContent from '../models/content/NavigationContent.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const MODELS_BY_PAGE = {
  home: HomeContent,
  about: AboutContent,
  footer: FooterContent,
  navigation: NavigationContent,
  branding: BrandingContent,
};

const getModel = (page) => {
  const model = MODELS_BY_PAGE[page];
  if (!model) throw new ApiError(404, `Unknown content page "${page}".`);
  return model;
};

export const getPageContent = asyncHandler(async (req, res) => {
  const Model = getModel(req.params.page);
  let query = Model.findOne();
  if (req.params.page === 'home') query = query.populate('popularItems.items.product');

  const content = (await query) || (await Model.create({}));
  res.json({ content });
});

const PAGE_LABELS = {
  home: 'Home page',
  about: 'About page',
  footer: 'Footer',
  navigation: 'Navigation',
  branding: 'Branding',
};

export const updatePageContent = asyncHandler(async (req, res) => {
  const Model = getModel(req.params.page);
  const content =
    (await Model.findOneAndUpdate({}, req.body, { new: true })) ||
    (await Model.create(req.body));

  logActivity({
    user: req.user,
    action: 'content.updated',
    description: `${req.user.name} updated the ${PAGE_LABELS[req.params.page] || req.params.page} content.`,
    targetType: 'content',
    targetId: req.params.page,
    targetLabel: PAGE_LABELS[req.params.page] || req.params.page,
  });

  res.json({ content });
});
