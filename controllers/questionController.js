const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

// @desc   Add a new question to a quiz
// @route  POST /api/questions/add
const addQuestion = async (req, res) => {
  try {
    const { quizId, questionText, questionType, options, correctAnswer, marks, hint, shortSolution } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Ensure only the creator can add questions
    if (quiz.creatorId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    const question = new Question({
      quizId,
      questionText,
      questionType,
      options,
      correctAnswer,
      marks,
      hint,
      shortSolution,
    });

    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Get all questions for a quiz
// @route  GET /api/questions/:quizId
const getQuestionsByQuiz = async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    if (!questions.length) return res.status(404).json({ error: "No questions found" });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Edit a question
// @route  PATCH /api/questions/edit/:id
const editQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // Ensure only the creator can edit
    const quiz = await Quiz.findById(question.quizId);
    if (quiz.creatorId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    Object.assign(question, req.body);
    await question.save();

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Delete a question
// @route  DELETE /api/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const quiz = await Quiz.findById(question.quizId);
    if (quiz.creatorId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await question.remove();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { addQuestion, getQuestionsByQuiz, editQuestion, deleteQuestion };
