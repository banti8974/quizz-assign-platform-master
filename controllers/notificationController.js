const { sendEmailNotification } = require("../utils/emailService");
const { sendPushNotification } = require("../utils/pushService");

// @desc   Send email notification
// @route  POST /api/notifications/email
const sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    if (!email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendEmailNotification(email, subject, message);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Email sending failed" });
  }
};

// @desc   Send push notification
// @route  POST /api/notifications/push
const sendPush = async (req, res) => {
  try {
    const { deviceToken, title, message } = req.body;
    if (!deviceToken || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendPushNotification(deviceToken, title, message);
    res.json({ message: "Push notification sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Push notification failed" });
  }
};

module.exports = { sendEmail, sendPush };
