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

    // If payment is successfully marked as Paid, set student to Active and provision their User account!
    if (status === 'Paid') {
      const student = await Student.findByIdAndUpdate(
        studentId,
        { status: 'Active' },
        { new: true }
      );

      if (student) {
        const User = require('../models/User');
        const Enrollment = require('../models/Enrollment');
        const Course = require('../models/Course');

        let user = await User.findOne({ email: student.email.toLowerCase() });

        if (!user) {
          console.log(`🌱 Auto-creating User account for manually enrolled student: ${student.email}`);
          user = await User.create({
            name: student.name,
            email: student.email.toLowerCase(),
            password: 'student@123', // Standard default password
            phone: student.phone,
            role: 'student',
            isVerified: true,
            isEnrolled: true
          });
        } else {
          user.isEnrolled = true;
          await user.save();
        }

        if (user) {
          const courseObj = await Course.findOne({ title: student.course });
          if (courseObj) {
            const existingEnrollment = await Enrollment.findOne({ student: user._id, course: courseObj._id });
            if (!existingEnrollment) {
              await Enrollment.create({
                student: user._id,
                course: courseObj._id,
                status: 'ongoing'
              });
            }
          }
        }
      }
    }

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
    const studentId = req.params.studentId;
    
    const User = require('../models/User');
    const Student = require('../models/Student');
    const mongoose = require('mongoose');
    
    let studentIds = [studentId];
    let targetEmail = '';
    
    // Check if the query parameter is a valid MongoDB ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(studentId);
    
    if (isValidObjectId) {
      // 1. Try to find if it's a User ID
      const userObj = await User.findById(studentId);
      if (userObj) {
        targetEmail = userObj.email.toLowerCase();
      } else {
        // 2. Try to find if it's a Student registration ID
        const studentObj = await Student.findById(studentId);
        if (studentObj) {
          targetEmail = studentObj.email.toLowerCase();
        }
      }
    } else if (studentId && studentId.length === 8) {
      // 3. Handle shortened user IDs (first 8 hex characters of ObjectId)
      const users = await User.find({});
      const matchedUser = users.find(u => u._id.toString().substring(0, 8).toLowerCase() === studentId.toLowerCase());
      if (matchedUser) {
        targetEmail = matchedUser.email.toLowerCase();
      }
    }
    
    // If we successfully resolved a student email, fetch all payments under any registrations matching that email
    if (targetEmail) {
      const registrations = await Student.find({ email: targetEmail });
      if (registrations.length > 0) {
        studentIds = registrations.map(r => r._id);
      }
    }
    
    const payments = await Payment.find({ studentId: { $in: studentIds } }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) { next(error); }
};

// Update Status
exports.updateStudentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (student) {
      const User = require('../models/User');
      const Enrollment = require('../models/Enrollment');
      const Course = require('../models/Course');

      const isActiveOrApproved = status === 'Active' || status === 'Approved';
      let user = await User.findOne({ email: student.email.toLowerCase() });

      if (isActiveOrApproved) {
        if (!user) {
          console.log(`🌱 Auto-creating User account for activated student: ${student.email}`);
          user = await User.create({
            name: student.name,
            email: student.email.toLowerCase(),
            password: 'student@123',
            phone: student.phone,
            role: 'student',
            isVerified: true,
            isEnrolled: true
          });
        } else {
          user.isEnrolled = true;
          await user.save();
        }

        if (user) {
          const courseObj = await Course.findOne({ title: student.course });
          if (courseObj) {
            const existingEnrollment = await Enrollment.findOne({ student: user._id, course: courseObj._id });
            if (!existingEnrollment) {
              await Enrollment.create({
                student: user._id,
                course: courseObj._id,
                status: 'ongoing'
              });
            }
          }
        }
      } else {
        if (user) {
          user.isEnrolled = false;
          await user.save();
        }
      }
    }

    res.json({ success: true, student });
  } catch (error) { next(error); }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { name, phone, email, branch, rollNumber, collegeName, location, course, status, batch } = req.body;
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
    if (batch !== undefined) updateData.batch = batch;

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!student) { res.status(404); throw new Error('Student not found'); }

    // Sync with User status if email or status is changed
    if (student) {
      const User = require('../models/User');
      const Enrollment = require('../models/Enrollment');
      const Course = require('../models/Course');

      const isActiveOrApproved = student.status === 'Active' || student.status === 'Approved';
      let user = await User.findOne({ email: student.email.toLowerCase() });

      if (isActiveOrApproved) {
        if (!user) {
          console.log(`🌱 Auto-creating User account on student update: ${student.email}`);
          user = await User.create({
            name: student.name,
            email: student.email.toLowerCase(),
            password: 'student@123',
            phone: student.phone,
            role: 'student',
            isVerified: true,
            isEnrolled: true,
            batch: student.batch || ''
          });
        } else {
          // Update details on the user too
          user.name = student.name;
          user.phone = student.phone;
          user.isEnrolled = true;
          user.batch = student.batch || '';
          await user.save();
        }

        if (user) {
          const courseObj = await Course.findOne({ title: student.course });
          if (courseObj) {
            const existingEnrollment = await Enrollment.findOne({ student: user._id, course: courseObj._id });
            if (!existingEnrollment) {
              await Enrollment.create({
                student: user._id,
                course: courseObj._id,
                status: 'ongoing'
              });
            }
          }
        }
      } else {
        if (user) {
          user.isEnrolled = false;
          await user.save();
        }
      }
    }

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
      res.json(enrollments || []);
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
       return res.json([]);
    }
    res.json(tasks);
  } catch (error) { next(error); }
};

// Submit Task
exports.submitTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { link } = req.body;
    const task = await Task.findOne({ _id: taskId, student: req.user.id });
    
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    
    task.status = 'Submitted';
    task.submission = {
      link,
      submittedAt: Date.now()
    };
    await task.save();
    res.json({ success: true, task });
  } catch (error) { next(error); }
};

// Dashboard: Get Job Listings
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    if (jobs.length === 0) {
      return res.json([]);
    }
    res.json(jobs);
  } catch (error) { next(error); }
};

// Apply for Job
exports.applyJob = async (req, res, next) => {
  try {
    const JobApplication = require('../models/JobApplication');
    const { jobId } = req.params;
    
    // Check if already applied
    const existing = await JobApplication.findOne({ student: req.user.id, job: jobId });
    if (existing) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }
    
    const application = await JobApplication.create({
      student: req.user.id,
      job: jobId
    });
    
    res.status(201).json({ success: true, application });
  } catch (error) { next(error); }
};

// Mark Lesson Complete
exports.markLessonComplete = async (req, res, next) => {
  try {
    const { enrollmentId } = req.params;
    const { lessonId } = req.body; // Can be title or ID string
    
    const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: req.user.id });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      // Optional: calculate progress here if we know total lessons
      await enrollment.save();
    }
    
    res.json({ success: true, enrollment });
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
    
    // Fetch active enrollment
    const activeEnrollment = await Enrollment.findOne({ student: userId });
    
    // Calculate stats
    const progress = activeEnrollment ? `${activeEnrollment.progress || 0}%` : "0%";
    const learningHours = activeEnrollment ? `${Math.round((activeEnrollment.completedLessons?.length || 0) * 1.5)}h` : "0h";
    
    const Certificate = require('../models/Certificate');
    const certificatesCount = await Certificate.countDocuments({ student: userId });

    // Calculate due amount
    const Student = require('../models/Student');
    const student = await Student.findOne({ email: user.email.toLowerCase() });
    
    let dueAmount = 0;
    let totalPaid = 0;
    let coursePrice = 0;
    let courseTitle = '';
    
    if (student) {
      const Course = require('../models/Course');
      const courseObj = await Course.findOne({ title: student.course });
      if (courseObj) {
        coursePrice = courseObj.price || 0;
        courseTitle = courseObj.title;
      }
      
      const Payment = require('../models/Payment');
      const payments = await Payment.find({ studentId: student._id, status: 'Paid' });
      totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
      
      dueAmount = coursePrice - totalPaid;
      if (dueAmount < 0) dueAmount = 0;
    }

    res.json({
      progress,
      tasks: `${completedTasksCount}/${tasksCount || 5}`,
      learningHours,
      certificates: certificatesCount.toString(),
      studentId: student ? student._id : null,
      dueAmount,
      totalPaid,
      coursePrice,
      courseTitle,
      hasDue: dueAmount > 0
    });
  } catch (error) { next(error); }
};

// Admin: Create a Task for a student or batch of students
exports.createTaskByAdmin = async (req, res, next) => {
  try {
    const { studentId, batchId, title, description, points, type, deadline } = req.body;
    const User = require('../models/User');
    const Batch = require('../models/Batch');

    if (batchId) {
      const batch = await Batch.findById(batchId).populate('students');
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }

      const createdTasks = [];
      for (const student of batch.students) {
        let user = await User.findOne({ email: student.email.toLowerCase() });
        if (!user) {
          console.log(`🌱 Auto-creating User account for batch task assignment: ${student.email}`);
          user = await User.create({
            name: student.name,
            email: student.email.toLowerCase(),
            password: 'student@123',
            phone: student.phone,
            role: 'student',
            isVerified: true,
            isEnrolled: true,
            batch: batch.name
          });
        }

        const task = await Task.create({
          student: user._id,
          title,
          description,
          points: points || 100,
          type: type || 'Coding',
          deadline: deadline || null,
          status: 'Pending'
        });
        createdTasks.push(task);
      }

      return res.status(201).json({ success: true, count: createdTasks.length });
    } else {
      const task = await Task.create({
        student: studentId,
        title,
        description,
        points: points || 100,
        type: type || 'Coding',
        deadline: deadline || null,
        status: 'Pending'
      });
      return res.status(201).json({ success: true, task });
    }
  } catch (error) { next(error); }
};

// Admin: Get all tasks/submissions
exports.getAllTaskSubmissions = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate('student', 'name email')
      .populate('course', 'title')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) { next(error); }
};

// Admin: Review a task submission
exports.reviewTaskSubmission = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { grade, feedback } = req.body;
    
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.status = 'Reviewed';
    if (task.submission) {
      task.submission.grade = grade;
      task.submission.feedback = feedback;
    } else {
      task.submission = {
        link: '',
        submittedAt: Date.now(),
        grade,
        feedback
      };
    }
    
    await task.save();
    res.json({ success: true, task });
  } catch (error) { next(error); }
};

// Admin: Create a Job
exports.createJobByAdmin = async (req, res, next) => {
  try {
    const { title, company, location, salary, description, requirements, link, type } = req.body;
    const job = await Job.create({
      title,
      company,
      location,
      salary: salary || 'Not Disclosed',
      description,
      requirements: requirements || [],
      link: link || '',
      type: type || 'Full-time',
      postedBy: req.user.id
    });
    res.status(201).json({ success: true, job });
  } catch (error) { next(error); }
};

// Admin: Delete a Job
exports.deleteJobByAdmin = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) { next(error); }
};

// Admin: Get all job applications
exports.getAllJobApplications = async (req, res, next) => {
  try {
    const JobApplication = require('../models/JobApplication');
    const applications = await JobApplication.find()
      .populate('student', 'name email phone')
      .populate('job')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) { next(error); }
};

// Admin: Update job application status
exports.updateJobApplicationStatus = async (req, res, next) => {
  try {
    const JobApplication = require('../models/JobApplication');
    const { appId } = req.params;
    const { status } = req.body;
    
    const application = await JobApplication.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json({ success: true, application });
  } catch (error) { next(error); }
};

// Admin: Issue Certificate
exports.issueCertificateByAdmin = async (req, res, next) => {
  try {
    const Certificate = require('../models/Certificate');
    const Student = require('../models/Student');
    const User = require('../models/User');
    const { studentId, title, fileUrl } = req.body;
    
    let targetUserId = studentId;

    // Check if studentId is a Student document ID
    const studentDoc = await Student.findById(studentId);
    if (studentDoc) {
      // Find corresponding User account by email
      let userDoc = await User.findOne({ email: studentDoc.email.toLowerCase() });
      if (!userDoc) {
        // Automatically create User account if they don't have one, so they can log in
        userDoc = await User.create({
          name: studentDoc.name,
          email: studentDoc.email.toLowerCase(),
          password: 'student@123', // default credentials
          role: 'student',
          phone: studentDoc.phone,
          isVerified: true
        });
      }
      targetUserId = userDoc._id;
    }

    const certificateId = 'GSH-CERT-' + Math.floor(100000 + Math.random() * 900000);
    const certificate = await Certificate.create({
      student: targetUserId,
      title,
      certificateId,
      fileUrl: fileUrl || ''
    });
    
    res.status(201).json({ success: true, certificate });
  } catch (error) { next(error); }
};

// Admin: Get all issued certificates
exports.getAllCertificates = async (req, res, next) => {
  try {
    const Certificate = require('../models/Certificate');
    const Student = require('../models/Student');
    const User = require('../models/User');

    // Healing loop: auto-update certificates that point to Student ID instead of User ID
    const allCerts = await Certificate.find();
    for (const cert of allCerts) {
      const studentDoc = await Student.findById(cert.student);
      if (studentDoc) {
        const userDoc = await User.findOne({ email: studentDoc.email.toLowerCase() });
        if (userDoc) {
          cert.student = userDoc._id;
          await cert.save();
        }
      }
    }

    const certificates = await Certificate.find()
      .populate('student', 'name email')
      .sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) { next(error); }
};

// Student: Get my certificates
exports.getMyCertificates = async (req, res, next) => {
  try {
    const Certificate = require('../models/Certificate');
    const certificates = await Certificate.find({ student: req.user.id })
      .sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) { next(error); }
};

// Public/Student: Verify certificate
exports.verifyCertificate = async (req, res, next) => {
  try {
    const Certificate = require('../models/Certificate');
    const { certId } = req.params;
    const certificate = await Certificate.findOne({ certificateId: certId })
      .populate('student', 'name email');
    if (!certificate) return res.status(404).json({ message: 'Certificate invalid or not found' });
    res.json({ success: true, certificate });
  } catch (error) { next(error); }
};

// --- BATCH MANAGEMENT CONTROLLERS ---
const Batch = require('../models/Batch');

exports.createBatch = async (req, res, next) => {
  try {
    const { name, studentIds } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Batch name is required' });
    }
    
    // Find or create the batch
    let batch = await Batch.findOne({ name: name.trim() });
    if (batch) {
      batch.students = studentIds || [];
      await batch.save();
    } else {
      batch = await Batch.create({
        name: name.trim(),
        students: studentIds || []
      });
    }

    // Set batch string to empty for any students previously in this batch (if name changed / reassigned)
    const allStudents = await Student.find({ batch: batch.name });
    const User = require('../models/User');
    for (const student of allStudents) {
      if (!studentIds.includes(student._id.toString())) {
        student.batch = '';
        await student.save();
        
        const user = await User.findOne({ email: student.email.toLowerCase() });
        if (user) {
          user.batch = '';
          await user.save();
        }
      }
    }

    // Now update all current batch students
    if (studentIds && studentIds.length > 0) {
      const targetStudents = await Student.find({ _id: { $in: studentIds } });
      for (const student of targetStudents) {
        student.batch = batch.name;
        await student.save();
        
        const user = await User.findOne({ email: student.email.toLowerCase() });
        if (user) {
          user.batch = batch.name;
          await user.save();
        }
      }
    }

    const populatedBatch = await Batch.findById(batch._id).populate('students');
    res.status(201).json({ success: true, batch: populatedBatch });
  } catch (error) {
    next(error);
  }
};

exports.getAllBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate('students').sort({ createdAt: -1 });
    res.json(batches);
  } catch (error) {
    next(error);
  }
};

exports.deleteBatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Clear batch field for all students in this batch
    const students = await Student.find({ batch: batch.name });
    const User = require('../models/User');
    for (const student of students) {
      student.batch = '';
      await student.save();
      
      const user = await User.findOne({ email: student.email.toLowerCase() });
      if (user) {
        user.batch = '';
        await user.save();
      }
    }

    await Batch.findByIdAndDelete(id);
    res.json({ success: true, message: 'Batch deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.removeStudentFromBatch = async (req, res, next) => {
  try {
    const { batchId, studentId } = req.params;
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    batch.students = batch.students.filter(id => id.toString() !== studentId);
    await batch.save();

    const student = await Student.findById(studentId);
    if (student && student.batch === batch.name) {
      student.batch = '';
      await student.save();

      const User = require('../models/User');
      const user = await User.findOne({ email: student.email.toLowerCase() });
      if (user) {
        user.batch = '';
        await user.save();
      }
    }

    res.json({ success: true, message: 'Student removed from batch' });
  } catch (error) {
    next(error);
  }
};


