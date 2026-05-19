const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    default: 'Glitch Skill Hub'
  },
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: true
  },
  fileUrl: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);
