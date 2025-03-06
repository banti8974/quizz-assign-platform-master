const express = require("express");
const router = express.Router();
const { sendEmail, sendPush } = require("../controllers/notificationController");

router.post("/email", sendEmail);
router.post("/push", sendPush);

module.exports = router;
