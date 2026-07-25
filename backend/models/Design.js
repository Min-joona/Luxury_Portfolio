const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  image: { type: String },
  videos: [{ type: String }],
  link: String,
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
