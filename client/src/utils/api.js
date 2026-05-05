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
export const getMyTasks = () => api.get('/my-tasks');
export const getJobs = () => api.get('/jobs');
export const getStudentStats = () => api.get('/student-stats');

// Courses
export const getAllCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

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

export default api;
