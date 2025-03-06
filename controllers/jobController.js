const { scheduleEmail } = require("../jobs/emailJob");
const { scheduleLeaderboardUpdate } = require("../jobs/leaderboardJob");

// @desc   Manually trigger email job
// @route  POST /api/jobs/schedule-email
const triggerEmailJob = async (req, res) => {
  try {
    const { email, subject, message, delay } = req.body;
    if (!email || !subject || !message) return res.status(400).json({ error: "Missing required fields" });

    await scheduleEmail(email, subject, message, delay || 0);
    res.json({ message: "Email job scheduled" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule email job" });
  }
};

// @desc   Manually trigger leaderboard update job
// @route  POST /api/jobs/schedule-leaderboard
const triggerLeaderboardJob = async (req, res) => {
  try {
    const { quizId, interval } = req.body;
    if (!quizId) return res.status(400).json({ error: "Missing quiz ID" });

    await scheduleLeaderboardUpdate(quizId, interval || 21600000); // Default: Every 6 hours
    res.json({ message: "Leaderboard update job scheduled" });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule leaderboard job" });
  }
};

module.exports = { triggerEmailJob, triggerLeaderboardJob };
