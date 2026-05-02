const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all courses
// @route   GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).populate('mentor', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a course (Mentor only)
// @route   POST /api/courses
router.post('/', protect, authorize('mentor', 'admin'), async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      mentor: req.user.id
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
