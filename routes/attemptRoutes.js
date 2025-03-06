const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
const { startQuiz, submitQuiz, getQuizReport } = require("../controllers/quizAttemptController");
const { requireAuth } = require("@clerk/express");


router.use(requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }));

router.post("/start/:quizId", startQuiz);
router.post("/submit/:attemptId", submitQuiz);
router.get("/report/:attemptId", getQuizReport);

module.exports = router;
