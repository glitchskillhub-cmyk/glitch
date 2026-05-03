const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  rollNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  location: { type: String, required: true },
  course: { type: String, required: true },
  presentRole: { type: String },
  experience: { type: String },
  companyName: { type: String },
  status: { type: String, enum: ['Pending', 'Active', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
