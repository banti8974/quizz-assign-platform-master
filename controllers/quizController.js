const Quiz = require("../models/Quiz");
const User = require("../models/User");

// @desc   Create a new quiz
// @route  POST /api/quizzes/create
const createQuiz = async (req, res) => {
  try {
    const { title, description, category, maxMarks, questionCount, isPublic, settings } = req.body;

    const quiz = new Quiz({
      title,
      description,
      creatorId: req.auth.userId, // Extracted from Clerk auth
      category,
      maxMarks,
      questionCount,
      isPublic,
      settings,
    });

    await quiz.save();

    // Add quiz to user's created quizzes
    await User.findOneAndUpdate(
      { userId: req.auth.userId },
      { $push: { quizzesCreated: quiz._id } }
    );

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Get a single quiz by ID
// @route  GET /api/quizzes/:id
const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Edit a quiz
// @route  PATCH /api/quizzes/edit/:id
const editQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Ensure only the creator can edit
    if (quiz.creatorId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    Object.assign(quiz, req.body);
    await quiz.save();

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Delete a quiz
// @route  DELETE /api/quizzes/:id
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    if (quiz.creatorId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await quiz.remove();
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   List all public quizzes
// @route  GET /api/quizzes/public
const getPublicQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createQuiz,
  getQuizDetails,
  editQuiz,
  deleteQuiz,
  getPublicQuizzes,
};
