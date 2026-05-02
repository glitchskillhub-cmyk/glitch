const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, registerMentorByAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/admin/register-mentor', registerMentorByAdmin);

module.exports = router;
