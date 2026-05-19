const Doubt = require('../models/Doubt');
const Announcement = require('../models/Announcement');

exports.getDoubts = async (req, res, next) => {
  try {
    const doubts = await Doubt.find()
      .populate('student', 'name avatar')
      .populate('answers.user', 'name avatar role')
      .sort({ createdAt: -1 });
    res.json(doubts);
  } catch (error) {
    next(error);
  }
};

exports.createDoubt = async (req, res, next) => {
  try {
    const { question, description } = req.body;
    const doubt = await Doubt.create({
      student: req.user.id,
      question,
      description
    });
    res.status(201).json(doubt);
  } catch (error) {
    next(error);
  }
};

exports.answerDoubt = async (req, res, next) => {
  try {
    const { doubtId } = req.params;
    const { answer } = req.body;
    
    const doubt = await Doubt.findById(doubtId);
    if (!doubt) {
      res.status(404);
      throw new Error('Doubt not found');
    }

    doubt.answers.push({
      user: req.user.id,
      answer
    });
    
    await doubt.save();
    res.json(doubt);
  } catch (error) {
    next(error);
  }
};

exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find()
      .populate('author', 'name role')
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    next(error);
  }
};

exports.createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, type, course } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      type,
      course,
      author: req.user.id
    });
    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};
