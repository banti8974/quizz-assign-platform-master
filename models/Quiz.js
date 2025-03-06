const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    isPublic: { type: Boolean, default: false },
    activeFrom: { type: Date },
    activeTill: { type: Date },
    maxMarks: { type: Number, required: true },
    questionCount: { type: Number, required: true },
    participantsCount: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    settings: {
      allowRetake: { type: Boolean, default: true },
      showAnswersAfterSubmission: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
