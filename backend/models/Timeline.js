const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['milestone', 'scholarship'],
    required: true
  },
  year: String,
  title: { type: String, required: true },
  company: String,
  desc: String,
  icon: { type: String, default: 'Award' },
  position: { type: String, enum: ['top', 'bottom'], default: 'top' },
  milestoneType: { type: String, enum: ['career', 'skill'] },
  place: String,
  status: { type: String, enum: ['In Progress', 'Declined', 'Accepted', 'Pending'], default: 'Declined' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
