const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
const { addQuestion, getQuestionsByQuiz, editQuestion, deleteQuestion } = require("../controllers/questionController");
const { requireAuth } = require("@clerk/express");


router.post("/add", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), addQuestion);
router.get("/:quizId", getQuestionsByQuiz);
router.patch("/edit/:id", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), editQuestion);
router.delete("/:id", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), deleteQuestion);

module.exports = router;
