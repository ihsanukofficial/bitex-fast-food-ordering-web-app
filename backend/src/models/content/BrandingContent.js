import mongoose from 'mongoose';

/**
 * Singleton document holding the site's brand logo. An empty logoUrl means "use the
 * bundled default logo" — the frontend falls back to its own static asset in that case,
 * so this collection never needs a seed entry to render correctly.
 */
const brandingContentSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

export default mongoose.model('BrandingContent', brandingContentSchema);
