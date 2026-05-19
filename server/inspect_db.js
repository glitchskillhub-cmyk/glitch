const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const Student = require('./models/Student');
const Payment = require('./models/Payment');
const User = require('./models/User');
const Enrollment = require('./models/Enrollment');
const Course = require('./models/Course');

async function inspectDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas successfully.');

    const email = 'tarun.raiseup@gmail.com';
    console.log(`\n=== Inspecting for ${email} ===`);

    const users = await User.find({ email: email.toLowerCase() });
    console.log('Users found:', users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role, isEnrolled: u.isEnrolled })));

    const students = await Student.find({ email: email.toLowerCase() });
    console.log('Student registrations found:', students.map(s => ({ id: s._id, name: s.name, email: s.email, course: s.course, status: s.status })));

    const studentIds = students.map(s => s._id);
    const payments = await Payment.find({ studentId: { $in: studentIds } });
    console.log('Payments found associated with Student IDs:', payments.map(p => ({ id: p._id, studentId: p.studentId, amount: p.amount, status: p.status, orderId: p.razorpayOrderId, payId: p.razorpayPaymentId })));

    const allPayments = await Payment.find({});
    console.log('\nAll Payments in DB:', allPayments.map(p => ({ id: p._id, studentId: p.studentId, amount: p.amount, status: p.status })));

    const enrollments = await Enrollment.find({ student: { $in: users.map(u => u._id) } }).populate('course');
    console.log('Enrollments found:', enrollments.map(e => ({ id: e._id, student: e.student, courseTitle: e.course?.title, status: e.status })));

    await mongoose.disconnect();
  } catch (error) {
    console.error('Inspection error:', error);
  }
}

inspectDb();
