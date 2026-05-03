const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  deadline: {
    type: Date
  },
  points: {
    type: Number,
    default: 100
  },
  type: {
    type: String,
    enum: ['Coding', 'Quiz', 'Design'],
    default: 'Coding'
  },
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Reviewed'],
    default: 'Pending'
  },
  submission: {
    link: String,
    submittedAt: Date,
    grade: String,
    feedback: String
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);
