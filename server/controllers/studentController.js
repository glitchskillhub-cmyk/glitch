const Student = require('../models/Student');
const Document = require('../models/Document');
const Payment = require('../models/Payment');
const Task = require('../models/Task');
const Job = require('../models/Job');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const path = require('path');
const fs = require('fs');

// Create Student
exports.createStudent = async (req, res, next) => {
  try {
    console.log('Incoming Registration Request:', req.body);
    const { 
      name, phone, email, branch, rollNumber, collegeName, location, course,
      presentRole, experience, companyName 
    } = req.body;
    const student = await Student.create({ 
      name, phone, email, branch, rollNumber, collegeName, location, course,
      presentRole, experience, companyName
    });
    res.status(201).json({ success: true, studentId: student._id });
  } catch (error) {
    console.error('Create Student Error:', error);
    next(error);
  }
};

// Get All Students
exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    // Attach payment status to each student
    const studentsWithPayment = await Promise.all(
      students.map(async (s) => {
        const payment = await Payment.findOne({ studentId: s._id });
        return { ...s.toObject(), paymentStatus: payment ? payment.status : 'Pending' };
      })
    );
    res.json(studentsWithPayment);
  } catch (error) {
    next(error);
  }
};

// Get Single Student (Profile + Documents + Payment)
exports.getStudentDetails = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) { res.status(404); throw new Error('Student not found'); }
    const documents = await Document.find({ studentId: student._id });
    const payment = await Payment.findOne({ studentId: student._id });
    res.json({ student, documents, payment });
  } catch (error) {
    next(error);
  }
};

// Upload Documents (structured: aadhaar, marksheet, idcard)
exports.uploadDocuments = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const files = req.files;
    if (!files || Object.keys(files).length === 0) {
      res.status(400); throw new Error('At least one document is required.');
    }
    const docTypes = ['aadhaar', 'marksheet', 'idcard'];
    const promises = [];
    docTypes.forEach(type => {
      if (files[type]) {
        files[type].forEach(file => {
          promises.push(
            Document.create({
              studentId,
              documentType: type,
              fileName: file.originalname,
              filePath: file.path.replace(/\\/g, '/'),
              fileType: file.mimetype
            })
          );
        });
      }
    });
    await Promise.all(promises);
    res.json({ success: true, message: 'Documents uploaded.' });
  } catch (error) {
    next(error);
  }
};

// Save Payment
exports.savePayment = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { amount, razorpayOrderId, razorpayPaymentId, razorpaySignature, status } = req.body;
    const payment = await Payment.create({
      studentId, amount,
      razorpayOrderId: razorpayOrderId || '',
      razorpayPaymentId: razorpayPaymentId || '',
      razorpaySignature: razorpaySignature || '',
      status: status || 'Paid'
    });
    res.json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

// Get Documents
exports.getStudentDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ studentId: req.params.studentId });
    res.json(documents);
  } catch (error) { next(error); }
};

// Get Payments
exports.getStudentPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId });
    res.json(payments);
  } catch (error) { next(error); }
};

// Update Status
exports.updateStudentStatus = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, student });
  } catch (error) { next(error); }
};

// Update Student (Full Edit)
exports.updateStudent = async (req, res, next) => {
  try {
    const { name, phone, email, branch, rollNumber, collegeName, location, course, status } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (branch !== undefined) updateData.branch = branch;
    if (rollNumber) updateData.rollNumber = rollNumber;
    if (collegeName) updateData.collegeName = collegeName;
    if (location !== undefined) updateData.location = location;
    if (course) updateData.course = course;
    if (status) updateData.status = status;

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!student) { res.status(404); throw new Error('Student not found'); }
    res.json({ success: true, student });
  } catch (error) { next(error); }
};

// Delete Student
exports.deleteStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const documents = await Document.find({ studentId });
    documents.forEach(doc => {
      const fullPath = path.join(__dirname, '..', doc.filePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });
    await Document.deleteMany({ studentId });
    await Payment.deleteMany({ studentId });
    await Student.findByIdAndDelete(studentId);
    res.json({ success: true, message: 'Record deleted.' });
  } catch (error) { next(error); }
};

// Dashboard Stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalPayments = await Payment.countDocuments({ status: 'Paid' });
    const pendingPayments = await Payment.countDocuments({ status: 'Pending' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.json({
      totalStudents,
      totalPayments,
      pendingPayments,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) { next(error); }
};

// Dashboard: Get My Enrollments
exports.getMyEnrollments = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    
    if (user && user.isEnrolled) {
      const enrollments = await Enrollment.find({ student: req.user.id }).populate('course');
      if (enrollments.length === 0) {
          return res.json([{
            title: "Node.js Full Stack Development",
            progress: 0,
            nextLesson: "Getting Started with Node.js",
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60"
          }]);
      }
      res.json(enrollments);
    } else {
      res.json([]);
    }
  } catch (error) { next(error); }
};

// Dashboard: Get My Tasks
exports.getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ student: req.user.id });
    if (tasks.length === 0) {
       return res.json([
         { title: "Portfolio Website", deadline: "Friday, 6:00 PM", status: "Pending", points: 100, type: "Coding" },
         { title: "API Integration Lab", deadline: "Saturday, 12:00 PM", status: "Submitted", points: 150, type: "Coding" }
       ]);
    }
    res.json(tasks);
  } catch (error) { next(error); }
};

// Dashboard: Get Job Listings
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    if (jobs.length === 0) {
      return res.json([
        { title: "Jr. Backend Developer", company: "TechCorp Solutions", location: "Remote / Hyderabad", salary: "6-8 LPA", tags: ["Node.js", "MongoDB"] },
        { title: "Full Stack Intern", company: "InnovateX AI", location: "Bangalore", salary: "₹20k - 25k", tags: ["React", "Express"] },
        { title: "Software Engineer Trainee", company: "CloudScale Inc", location: "Pune", salary: "4.5 LPA", tags: ["JavaScript", "AWS"] },
      ]);
    }
    res.json(jobs);
  } catch (error) { next(error); }
};

// Dashboard: Get Student Stats
exports.getStudentDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    const user = await User.findById(userId);
    
    // Count tasks
    const tasksCount = await Task.countDocuments({ student: userId });
    const completedTasksCount = await Task.countDocuments({ student: userId, status: 'Submitted' });
    
    // Count enrollments
    const enrollmentsCount = await Enrollment.countDocuments({ student: userId });
    
    // Default stats if empty
    res.json({
      progress: user.isEnrolled ? "65%" : "0%",
      tasks: `${completedTasksCount}/${tasksCount || 5}`,
      learningHours: user.isEnrolled ? "48h" : "0h",
      certificates: "0"
    });
  } catch (error) { next(error); }
};


