const express = require("express");
const router = express.Router();
const { triggerEmailJob, triggerLeaderboardJob } = require("../controllers/jobController");

router.post("/schedule-email", triggerEmailJob);
router.post("/schedule-leaderboard", triggerLeaderboardJob);

module.exports = router;
