const express = require("express");
const router = express.Router();
const { processVoiceInput } = require("../controllers/voiceController");
const { requireAuth } = require("@clerk/express");


router.use(requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }));

router.post("/transcribe", processVoiceInput);

module.exports = router;
