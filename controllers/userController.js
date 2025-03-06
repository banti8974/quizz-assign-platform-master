const User = require("../models/User");

// @desc   Get User Profile
// @route  GET /api/users/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.auth.userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Update User Profile
// @route  PATCH /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.auth.userId },
      { $set: req.body },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc   Get User Analytics
// @route  GET /api/users/analytics
const getUserAnalytics = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.auth.userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.analytics);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getUserProfile, updateUserProfile, getUserAnalytics };
