const Leaderboard = require("../models/Leaderboard");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");

// @desc   Get leaderboard for a quiz
// @route  GET /api/leaderboard/:quizId
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findOne({ quizId: req.params.quizId }).populate(
      "rankings.userId",
      "name avatarUrl"
    );

    if (!leaderboard) return res.status(404).json({ error: "Leaderboard not found" });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Update leaderboard when a quiz is submitted
const updateLeaderboard = async (quizId, userId, score) => {
  try {
    let leaderboard = await Leaderboard.findOne({ quizId });

    if (!leaderboard) {
      leaderboard = new Leaderboard({ quizId, rankings: [] });
    }

    leaderboard.rankings.push({ userId, score, attemptedAt: new Date() });
    leaderboard.rankings.sort((a, b) => b.score - a.score); // Sort by highest score

    await leaderboard.save();
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

module.exports = { getLeaderboard, updateLeaderboard };
