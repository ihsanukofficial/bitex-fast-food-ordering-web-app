import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  { label: String, href: String, icon: String },
  { _id: false },
);

const footerContentSchema = new mongoose.Schema(
  {
    brandDescription: { type: String, default: '' },
    contact: {
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    hours: {
      days: { type: String, default: '' },
      time: { type: String, default: '' },
    },
    socialLinks: { type: [socialLinkSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('FooterContent', footerContentSchema);
