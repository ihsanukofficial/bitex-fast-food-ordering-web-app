import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({ value: String, label: String }, { _id: false });
const valueSchema = new mongoose.Schema(
  { number: String, title: String, description: String },
  { _id: false },
);
const promiseSchema = new mongoose.Schema(
  { title: String, description: String },
  { _id: false },
);
const highlightSchema = new mongoose.Schema(
  { label: String, accent: String },
  { _id: false },
);

const aboutContentSchema = new mongoose.Schema(
  {
    story: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      lead: { type: String, default: '' },
      description: { type: String, default: '' },
      image: { type: String, default: '' },
      stats: { type: [statSchema], default: [] },
      caption: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    },
    mission: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      intro: { type: String, default: '' },
      values: { type: [valueSchema], default: [] },
    },
    qualityPromise: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
      image: { type: String, default: '' },
      promises: { type: [promiseSchema], default: [] },
      note: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    },
    freshIngredients: {
      eyebrow: { type: String, default: '' },
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
      closing: { type: String, default: '' },
      image: { type: String, default: '' },
      highlights: { type: [highlightSchema], default: [] },
    },
  },
  { timestamps: true },
);

export default mongoose.model('AboutContent', aboutContentSchema);
