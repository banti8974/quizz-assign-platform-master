const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    questionText: { type: String, required: true },
    questionType: { type: String, enum: ["MCQ", "Short Answer", "Number", "Voice"], required: true },
    options: [{ type: String }], // Only for MCQ
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true }, // String for text/number, array for MCQ
    marks: { type: Number, required: true },
    hint: { type: String, default: "" },
    shortSolution: { type: String, default: "" },
    generatedByAI: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
