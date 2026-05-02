import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboards
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';

// Legacy SVAdmin Pages
import AdminDashboard from './pages/AdminDashboard';
import AddStudent from './pages/AddStudent';
import StudentDetails from './pages/StudentDetails';
import AdminLogin from './pages/AdminLogin';
import AdminSettings from './pages/AdminSettings';
import AddMentor from './pages/AddMentor';

// Admin Auth Helper (Legacy)
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isSVAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

// New Role-based Protection
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a spinner
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
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
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student Dashboard */}
        <Route path="/student/dashboard" element={
          <RoleProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleProtectedRoute>
        } />

        {/* Mentor Dashboard */}
        <Route path="/mentor/dashboard" element={
          <RoleProtectedRoute allowedRoles={['mentor']}>
            <MentorDashboard />
          </RoleProtectedRoute>
        } />
        
        {/* Legacy Admin Routes (Preserved) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/add-student" element={
          <AdminProtectedRoute>
            <AddStudent />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/add-mentor" element={
          <AdminProtectedRoute>
            <AddMentor />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/student/:id" element={
          <AdminProtectedRoute>
            <StudentDetails />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <AdminProtectedRoute>
            <AdminSettings />
          </AdminProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
