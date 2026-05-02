const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progress: {
    type: Number,
    default: 0 // Percentage
  },
  completedLessons: [{
    type: String // Lesson title or ID
  }],
  status: {
    type: String,
    enum: ['not-started', 'ongoing', 'completed'],
    default: 'not-started'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
