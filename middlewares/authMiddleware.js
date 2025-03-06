const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const authMiddleware = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    res.status(401).json({ error: "Unauthorized Access" });
  },
});

module.exports = authMiddleware;
