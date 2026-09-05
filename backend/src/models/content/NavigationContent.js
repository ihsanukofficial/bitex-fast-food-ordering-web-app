import mongoose from 'mongoose';

const navLinkSchema = new mongoose.Schema(
  { id: String, label: String, to: String },
  { _id: false },
);

const navigationContentSchema = new mongoose.Schema(
  {
    links: { type: [navLinkSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('NavigationContent', navigationContentSchema);
