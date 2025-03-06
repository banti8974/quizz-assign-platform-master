const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true }, // From Clerk Auth
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatarUrl: { type: String }, // User Profile Picture
    role: { type: String, enum: ["user", "creator", "admin"], default: "user" },
    quizzesAttempted: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizAttempt" }],
    quizzesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    analytics: {
      totalQuizzesTaken: { type: Number, default: 0 },
      totalCorrectAnswers: { type: Number, default: 0 },
      totalScore: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
