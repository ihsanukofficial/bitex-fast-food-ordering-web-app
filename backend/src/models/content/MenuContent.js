import mongoose from 'mongoose';

/**
 * Singleton document for the Menu page's editable pieces — currently just the search
 * banner's background photo. An empty backgroundImage means "use the bundled default",
 * the same convention BrandingContent uses for the logo.
 */
const menuContentSchema = new mongoose.Schema(
  {
    searchBanner: {
      backgroundImage: { type: String, default: '' },
    },
  },
  { timestamps: true },
);

export default mongoose.model('MenuContent', menuContentSchema);
