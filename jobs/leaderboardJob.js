const { Queue, redisConnection } = require("../config/queueConfig");
const Leaderboard = require("../models/Leaderboard");
const QuizAttempt = require("../models/QuizAttempt");

const leaderboardQueue = new Queue("leaderboardQueue", { connection: redisConnection });

/**
 * Schedule a leaderboard update job.
 * @param {string} quizId - The quiz ID
 * @param {number} interval - Interval in milliseconds (e.g., every 6 hours)
 */
const scheduleLeaderboardUpdate = async (quizId, interval) => {
  await leaderboardQueue.add("updateLeaderboard", { quizId }, { repeat: { every: interval } });
};

// Process leaderboard update jobs
const leaderboardWorker = new Worker(
  "leaderboardQueue",
  async (job) => {
    const { quizId } = job.data;
    const attempts = await QuizAttempt.find({ quizId }).sort({ score: -1 }).limit(10);

    const leaderboard = { quizId, rankings: [] };
    attempts.forEach((attempt) => {
      leaderboard.rankings.push({
        userId: attempt.userId,
        score: attempt.score,
        attemptedAt: attempt.attemptedAt,
      });
    });

    await Leaderboard.findOneAndUpdate({ quizId }, leaderboard, { upsert: true });
    console.log(`Leaderboard Updated for Quiz: ${quizId}`);
  },
  { connection: redisConnection }
);

leaderboardWorker.on('failed', (job, err) => {
  console.error(`Leaderboard job ${job.id} failed:`, err);
});


module.exports = { scheduleLeaderboardUpdate };
