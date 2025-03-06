const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
const { createQuiz, getQuizDetails, editQuiz, deleteQuiz, getPublicQuizzes } = require("../controllers/quizController");
const { requireAuth } = require('@clerk/express');


router.post("/create", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), createQuiz);
router.get("/:id", getQuizDetails);
router.patch("/edit/:id", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), editQuiz);
router.delete("/:id", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), deleteQuiz);
router.get("/public", getPublicQuizzes);

module.exports = router;
