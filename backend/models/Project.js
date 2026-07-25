const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
  cover: { type: String },
  demo: String,
  github: String,
  overview: String,
  challenge: String,
  outcome: String,
  tech: [String],
  features: [String],
  client: String,
  duration: String,
  date: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
