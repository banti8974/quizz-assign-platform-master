const QuizAttempt = require("../models/QuizAttempt");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { updateLeaderboard } = require("./leaderboardController");

// @desc   Start a quiz attempt
// @route  POST /api/attempts/start/:quizId
const startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const existingAttempt = await QuizAttempt.findOne({
      quizId: quiz._id,
      userId: req.auth.userId,
      completed: false,
    });

    if (existingAttempt) {
      return res.json({ message: "Quiz already started", attemptId: existingAttempt._id });
    }

    const newAttempt = new QuizAttempt({
      quizId: quiz._id,
      userId: req.auth.userId,
      totalMarks: quiz.maxMarks,
      answers: [],
    });

    await newAttempt.save();
    res.status(201).json({ message: "Quiz started", attemptId: newAttempt._id });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Submit quiz attempt
// @route  POST /api/attempts/submit/:attemptId
const submitQuiz = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId);
    if (!attempt) return res.status(404).json({ error: "Quiz attempt not found" });

    if (attempt.userId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    if (attempt.completed) return res.status(400).json({ error: "Quiz already submitted" });

    const questions = await Question.find({ quizId: attempt.quizId });
    let totalScore = 0;

    req.body.answers.forEach((answer) => {
      const question = questions.find((q) => q._id.toString() === answer.questionId);
      if (question) {
        const isCorrect =
          question.questionType === "MCQ"
            ? question.correctAnswer.includes(answer.userAnswer)
            : question.correctAnswer == answer.userAnswer;

        const marksAwarded = isCorrect ? question.marks : 0;
        totalScore += marksAwarded;

        attempt.answers.push({
          questionId: question._id,
          userAnswer: answer.userAnswer,
          isCorrect,
          marksAwarded,
        });
      }
    });

    attempt.score = totalScore;
    attempt.completed = true;
    await attempt.save();

    res.json({ message: "Quiz submitted", totalScore });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Get quiz report
// @route  GET /api/attempts/report/:attemptId
const getQuizReport = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId).populate("answers.questionId");
    if (!attempt) return res.status(404).json({ error: "Quiz attempt not found" });

    if (attempt.userId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


const submitQuiz2 = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId);
    if (!attempt) return res.status(404).json({ error: "Quiz attempt not found" });

    if (attempt.userId.toString() !== req.auth.userId)
      return res.status(403).json({ error: "Unauthorized" });

    if (attempt.completed) return res.status(400).json({ error: "Quiz already submitted" });

    const questions = await Question.find({ quizId: attempt.quizId });
    let totalScore = 0;

    req.body.answers.forEach((answer) => {
      const question = questions.find((q) => q._id.toString() === answer.questionId);
      if (question) {
        const isCorrect =
          question.questionType === "MCQ"
            ? question.correctAnswer.includes(answer.userAnswer)
            : question.correctAnswer == answer.userAnswer;

        const marksAwarded = isCorrect ? question.marks : 0;
        totalScore += marksAwarded;

        attempt.answers.push({
          questionId: question._id,
          userAnswer: answer.userAnswer,
          isCorrect,
          marksAwarded,
        });
      }
    });

    attempt.score = totalScore;
    attempt.completed = true;
    await attempt.save();

    // Update leaderboard
    await updateLeaderboard(attempt.quizId, attempt.userId, totalScore);

    res.json({ message: "Quiz submitted", totalScore });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


module.exports = { startQuiz, submitQuiz, getQuizReport };
