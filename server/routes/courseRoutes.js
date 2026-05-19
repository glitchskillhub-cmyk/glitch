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

// @desc    Get course by ID
// @route   GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('mentor', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a course
// @route   PUT /api/courses/:id
router.put('/:id', protect, authorize('admin', 'mentor'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add a module to course
// @route   POST /api/courses/:id/modules
router.post('/:id/modules', protect, authorize('admin', 'mentor'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.modules.push({ title: req.body.title, lessons: [] });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a module from course
// @route   DELETE /api/courses/:id/modules/:moduleId
router.delete('/:id/modules/:moduleId', protect, authorize('admin', 'mentor'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.modules = course.modules.filter(m => m._id.toString() !== req.params.moduleId);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add a lesson to module
// @route   POST /api/courses/:id/modules/:moduleId/lessons
router.post('/:id/modules/:moduleId/lessons', protect, authorize('admin', 'mentor'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const module = course.modules.find(m => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    module.lessons.push({
      title: req.body.title,
      content: req.body.content || '',
      videoUrl: req.body.videoUrl || '',
      resources: req.body.resources || []
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a lesson from module
// @route   DELETE /api/courses/:id/modules/:moduleId/lessons/:lessonId
router.delete('/:id/modules/:moduleId/lessons/:lessonId', protect, authorize('admin', 'mentor'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const module = course.modules.find(m => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    module.lessons = module.lessons.filter(l => l._id.toString() !== req.params.lessonId);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
