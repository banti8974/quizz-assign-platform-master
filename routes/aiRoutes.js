const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
const { generateQuiz } = require("../controllers/aiController");
const { requireAuth } = require("@clerk/express");


// router.use(requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }));

router.post("/generate-quiz", generateQuiz);

module.exports = router;
