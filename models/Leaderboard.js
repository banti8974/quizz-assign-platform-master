const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    rankings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: { type: Number, required: true },
        attemptedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
