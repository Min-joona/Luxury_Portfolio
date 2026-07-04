const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  path: String,
  date: { type: Date, default: Date.now },
  referrer: String,
  userAgent: String
});

pageViewSchema.index({ date: -1 });

module.exports = mongoose.model('PageView', pageViewSchema);
