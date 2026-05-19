const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

// Doubts
router.route('/doubts')
  .get(protect, communityController.getDoubts)
  .post(protect, communityController.createDoubt);

router.post('/doubts/:doubtId/answer', protect, communityController.answerDoubt);

// Announcements
router.route('/announcements')
  .get(protect, communityController.getAnnouncements)
  .post(protect, communityController.createAnnouncement);

module.exports = router;
