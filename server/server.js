const dotenv = require('dotenv');
// Load env vars FIRST
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const path = require('path');
const fs = require('fs');

// Disable Mongoose buffering — fail fast if DB not connected
mongoose.set('bufferCommands', false);

const app = express();

// Create uploads folder if not exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://glitch-skill-hub.vercel.app", 
    "https://glitch-dashboard-client.onrender.com",
    "https://glitch-ashen-iota.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/', (req, res) => {
  res.send('API Running');
});

// Test email endpoint (temporary - for debugging)
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendReceiptEmail } = require('./utils/email');
    const hasCredentials = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    if (!hasCredentials) {
      return res.json({ success: false, message: 'EMAIL_USER or EMAIL_PASS not set', EMAIL_USER: !!process.env.EMAIL_USER, EMAIL_PASS: !!process.env.EMAIL_PASS });
    }
    await sendReceiptEmail(
      { name: 'Tarun', email: 'tarun.raiseup@gmail.com', course: 'Node.js Full Stack' },
      { amount: 9999, razorpayPaymentId: 'pay_TEST_RENDER_CHECK' }
    );
    res.json({ success: true, message: 'Test email sent to tarun.raiseup@gmail.com' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// API Routes
// MOUNT MORE SPECIFIC ROUTES FIRST
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', studentRoutes);

// Error handler
app.use(errorHandler);

// START: Connect DB first, THEN listen
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server:`);
    console.error(error);
    process.exit(1);
  }
};

startServer();
