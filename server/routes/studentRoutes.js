const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const studentController = require('../controllers/studentController');
const paymentController = require('../controllers/paymentController');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only JPG, PNG and PDF files are allowed!'));
  }
});

// Structured upload fields
const docUpload = upload.fields([
  { name: 'aadhaar', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 },
  { name: 'idcard', maxCount: 1 },
]);

const { validateStudentSubmission } = require('../validation/studentValidation');
const { protect } = require('../middleware/authMiddleware');

// Student Routes
router.post('/students', validateStudentSubmission, studentController.createStudent);
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentDetails);
router.put('/students/:id/status', studentController.updateStudentStatus);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Dashboard Stats
router.get('/dashboard/stats', studentController.getDashboardStats);

// Student Dashboard Specifics
router.get('/my-enrollments', protect, studentController.getMyEnrollments);
router.get('/my-tasks', protect, studentController.getMyTasks);
router.post('/my-tasks/:taskId/submit', protect, studentController.submitTask);
router.post('/my-enrollments/:enrollmentId/mark-lesson', protect, studentController.markLessonComplete);
router.get('/student-stats', protect, studentController.getStudentDashboardStats);
router.get('/jobs', protect, studentController.getAllJobs);
router.post('/jobs/:jobId/apply', protect, studentController.applyJob);

// Admin Task Control Routes
router.post('/admin/tasks', protect, studentController.createTaskByAdmin);
router.get('/admin/tasks/submissions', protect, studentController.getAllTaskSubmissions);
router.post('/admin/tasks/:taskId/review', protect, studentController.reviewTaskSubmission);

// Admin Batch Routes
router.post('/admin/batches', protect, studentController.createBatch);
router.get('/admin/batches', protect, studentController.getAllBatches);
router.delete('/admin/batches/:id', protect, studentController.deleteBatch);
router.delete('/admin/batches/:batchId/students/:studentId', protect, studentController.removeStudentFromBatch);

// Admin Career Hub Routes
router.post('/admin/jobs', protect, studentController.createJobByAdmin);
router.delete('/admin/jobs/:jobId', protect, studentController.deleteJobByAdmin);
router.get('/admin/jobs/applications', protect, studentController.getAllJobApplications);
router.put('/admin/jobs/applications/:appId', protect, studentController.updateJobApplicationStatus);

// Certificate Routes
router.post('/admin/certificates', protect, studentController.issueCertificateByAdmin);
router.get('/admin/certificates', protect, studentController.getAllCertificates);
router.get('/my-certificates', protect, studentController.getMyCertificates);
router.get('/certificates/verify/:certId', studentController.verifyCertificate);

// Document Routes
router.post('/documents/upload/:studentId', docUpload, studentController.uploadDocuments);
router.get('/documents/:studentId', studentController.getStudentDocuments);

// Payment Routes (Razorpay)
router.post('/payments/create-order', paymentController.createOrder);
router.post('/payments/verify', paymentController.verifyPayment);
router.post('/payments/:studentId', studentController.savePayment);
router.get('/payments/:studentId', studentController.getStudentPayments);

module.exports = router;
