import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Mentors from './pages/Mentors';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import Success from './pages/Success';
import NodeCourse from './pages/NodeCourse';
import NodeCourseTwo from './pages/nodecoursetwo';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import NotFound from './pages/NotFound';
import Partners from './pages/Partners';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboards
import StudentLayout from './components/StudentLayout';
import StudentDashboardHome from './pages/student/Dashboard';
import StudentPrograms from './pages/student/StudentPrograms';
import StudentCurriculum from './pages/student/Curriculum';
import StudentTasks from './pages/student/Tasks';
import StudentPayments from './pages/student/Payments';
import StudentCertificates from './pages/student/Certificates';
import StudentCareerHub from './pages/student/CareerHub';
import StudentCommunity from './pages/student/Community';
import StudentSettings from './pages/student/Settings';

import MentorDashboard from './pages/MentorDashboard';

// New Admin Portal Components
import AdminLayout from './components/AdminLayout';
import AdminDashboardV2 from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminBatches from './pages/admin/Batches';
import AdminMentors from './pages/admin/Mentors';
import AdminPrograms from './pages/admin/Programs';
import AdminPayments from './pages/admin/Payments';
import AdminSettingsV2 from './pages/admin/Settings';
import AdminCurriculum from './pages/admin/Curriculum';
import AdminTasks from './pages/admin/Tasks';
import AdminCareerHub from './pages/admin/CareerHub';
import AdminCertificates from './pages/admin/Certificates';
import AdminCommunity from './pages/admin/Community';
import AdminLeads from './pages/admin/Leads';

// Legacy SVAdmin Pages (For Reference)
import AdminLogin from './pages/AdminLogin';

// Admin Auth Helper (Legacy)
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isSVAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

// New Role-based Protection
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  
  // Normalize role: treat 'customer' as 'student'
  const normalizedRole = user.role === 'customer' ? 'student' : user.role;
  if (!allowedRoles.includes(normalizedRole)) return <Navigate to="/" />;

  return children ? children : <Outlet />;
};

// Redirect authenticated users away from login/signup
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) {
    if (user.role === 'mentor') return <Navigate to="/mentor/dashboard" />;
    return <Navigate to="/student/dashboard" />;
  }

  return children ? children : <Outlet />;
};

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        containerStyle={{ zIndex: 99999 }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/services" element={<Navigate to="/programs" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/success" element={<Success />} />
        <Route path="/node-js-course" element={<NodeCourse />} />
        <Route path="/node-js-course-two" element={<NodeCourseTwo />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<ReturnPolicy />} />
        <Route path="/partners" element={<Partners />} />
        
        {/* Authentication */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<StudentLayout><Outlet /></StudentLayout>}>
            <Route index element={<Navigate to="/student/dashboard" />} />
            <Route path="dashboard" element={<StudentDashboardHome />} />
            <Route path="programs" element={<StudentPrograms />} />
            <Route path="curriculum" element={<StudentCurriculum />} />
            <Route path="tasks" element={<StudentTasks />} />
            <Route path="payments" element={<StudentPayments />} />
            <Route path="certificates" element={<StudentCertificates />} />
            <Route path="career" element={<StudentCareerHub />} />
            <Route path="community" element={<StudentCommunity />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Route>

        {/* Mentor Dashboard */}
        <Route path="/mentor/dashboard" element={
          <RoleProtectedRoute allowedRoles={['mentor']}>
            <MentorDashboard />
          </RoleProtectedRoute>
        } />
        
        {/* New Professional Admin Portal */}
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminLayout><Outlet /></AdminLayout>
          </AdminProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<AdminDashboardV2 />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="batches" element={<AdminBatches />} />
          <Route path="mentors" element={<AdminMentors />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="curriculum" element={<AdminCurriculum />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="career" element={<AdminCareerHub />} />
          <Route path="community" element={<AdminCommunity />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="settings" element={<AdminSettingsV2 />} />
        </Route>

        {/* Legacy Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
