const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      videoUrl: String,
      resources: [String]
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
