const mongoose = require('mongoose');

// Single-document résumé content, editable from the admin panel.
const entrySchema = new mongoose.Schema({
  title: String,
  org: String,
  date: String,
  points: [String],
}, { _id: false });

const eduSchema = new mongoose.Schema({
  school: String,
  detail: String,
  date: String,
  note: String,
}, { _id: false });

const langSchema = new mongoose.Schema({
  name: String,
  level: String,
  pct: { type: Number, default: 50 },
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  title: { type: String, default: 'Full Stack Developer' },
  summary: String,
  contact: {
    email: String,
    phone: String,
    location: String,
    website: String,
  },
  photo: String,
  pdfUrl: String,
  technical: [String],
  medical: [String],
  languages: [langSchema],
  leadership: [entrySchema],
  experience: [entrySchema],
  education: [eduSchema],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
