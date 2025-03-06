const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
const { getUserProfile, updateUserProfile, getUserAnalytics } = require("../controllers/userController");
const { requireAuth } = require("@clerk/express");


router.use(requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }));

router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);
router.get("/analytics", getUserAnalytics);

module.exports = router;
