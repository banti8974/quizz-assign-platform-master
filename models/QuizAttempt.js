const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0 },
    totalMarks: { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        userAnswer: { type: mongoose.Schema.Types.Mixed },
        isCorrect: { type: Boolean },
        marksAwarded: { type: Number, default: 0 },
      },
    ],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
