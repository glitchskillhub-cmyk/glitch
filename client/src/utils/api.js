import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000/api' 
    : 'https://glitch-azwb.onrender.com/api',
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Server is waking up or down. Please try again.';
    // You can use window.toast or similar if available, or just log it
    // Since I don't want to add a new dependency here, I'll just log it
    // But the components can handle individual errors too.
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

// Student
export const createStudent = (data) => api.post('/students', data);
export const getAllStudents = () => api.get('/students');
export const getStudentDetails = (id) => api.get(`/students/${id}`);
export const updateStudentStatus = (id, status) => api.put(`/students/${id}/status`, { status });
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Dashboard
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getMyEnrollments = () => api.get('/my-enrollments');
export const markLessonComplete = (enrollmentId, data) => api.post(`/my-enrollments/${enrollmentId}/mark-lesson`, data);
export const getMyTasks = () => api.get('/my-tasks');
export const submitTask = (taskId, data) => api.post(`/my-tasks/${taskId}/submit`, data);
export const getJobs = () => api.get('/jobs');
export const applyJob = (jobId) => api.post(`/jobs/${jobId}/apply`);
export const getStudentStats = () => api.get('/student-stats');
export const createTaskByAdmin = (data) => api.post('/admin/tasks', data);
export const getAllTaskSubmissions = () => api.get('/admin/tasks/submissions');
export const reviewTaskSubmission = (taskId, data) => api.post(`/admin/tasks/${taskId}/review`, data);
export const createJobByAdmin = (data) => api.post('/admin/jobs', data);
export const deleteJobByAdmin = (jobId) => api.delete(`/admin/jobs/${jobId}`);
export const getAllJobApplications = () => api.get('/admin/jobs/applications');
export const updateJobApplicationStatus = (appId, data) => api.put(`/admin/jobs/applications/${appId}`, data);
export const issueCertificateByAdmin = (data) => api.post('/admin/certificates', data);
export const getAllCertificates = () => api.get('/admin/certificates');
export const getMyCertificates = () => api.get('/my-certificates');
export const verifyCertificate = (certId) => api.get(`/certificates/verify/${certId}`);

// Courses
export const getAllCourses = () => api.get('/courses');
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (data) => api.post('/courses', data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const addModule = (courseId, data) => api.post(`/courses/${courseId}/modules`, data);
export const deleteModule = (courseId, moduleId) => api.delete(`/courses/${courseId}/modules/${moduleId}`);
export const addLesson = (courseId, moduleId, data) => api.post(`/courses/${courseId}/modules/${moduleId}/lessons`, data);
export const deleteLesson = (courseId, moduleId, lessonId) => api.delete(`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);

// Documents
export const uploadDocuments = (studentId, formData) =>
  api.post(`/documents/upload/${studentId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Payments (Razorpay)
export const createRazorpayOrder = (data) => api.post('/payments/create-order', data);
export const verifyRazorpayPayment = (data) => api.post('/payments/verify', data);
export const savePayment = (studentId, data) => api.post(`/payments/${studentId}`, data);
export const getStudentPayments = (studentId) => api.get(`/payments/${studentId}`);

// Auth/Admin
export const registerMentorByAdmin = (data) => api.post('/auth/admin/register-mentor', data);
export const updateProfile = (data) => api.put('/auth/profile', data);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const verifyOTP = (data) => api.post('/auth/verify-otp', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);

// Community
export const getDoubts = () => api.get('/community/doubts');
export const createDoubt = (data) => api.post('/community/doubts', data);
export const answerDoubt = (doubtId, data) => api.post(`/community/doubts/${doubtId}/answer`, data);
export const getAnnouncements = () => api.get('/community/announcements');
export const createAnnouncement = (data) => api.post('/community/announcements', data);

export default api;
