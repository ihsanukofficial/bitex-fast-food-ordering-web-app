import mongoose from 'mongoose';

const reasonSchema = new mongoose.Schema(
  { title: String, description: String },
  { _id: false },
);

const popularItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    label: { type: String, default: '' },
  },
  { _id: false },
);

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: '' },
      headline: { type: String, default: '' },
      subHeadline: { type: String, default: '' },
      highlights: { type: [String], default: [] },
      images: { type: [String], default: [] },
    },
    popularItems: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      items: { type: [popularItemSchema], default: [] },
    },
    categoriesSection: {
      eyebrow: { type: String, default: '' },
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
    },
    whyChooseBiteX: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      reasons: { type: [reasonSchema], default: [] },
      closingStatement: { type: String, default: '' },
    },
    cta: {
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
    },
  },
  { timestamps: true },
);

export default mongoose.model('HomeContent', homeContentSchema);
