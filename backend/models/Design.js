const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  link: String,
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
