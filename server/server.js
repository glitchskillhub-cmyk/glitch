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
const communityRoutes = require('./routes/communityRoutes');
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
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
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

// API Routes
// MOUNT MORE SPECIFIC ROUTES FIRST
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/community', communityRoutes);
app.use('/api', studentRoutes);

// Error handler
app.use(errorHandler);

// START: Connect DB first, THEN listen
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    // Seed default admin accounts if they don't exist
    const User = require('./models/User');
    const adminEmails = ['admin@glitch.com', 'admin@svsolutions.com'];
    for (const email of adminEmails) {
      const adminExists = await User.findOne({ email });
      if (!adminExists) {
        console.log(`🌱 Seeding admin account: ${email}`);
        await User.create({
          name: email === 'admin@glitch.com' ? 'Glitch Admin' : 'SV Admin',
          email,
          password: 'admin@123',
          role: 'admin',
          isVerified: true
        });
      }
    }

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
