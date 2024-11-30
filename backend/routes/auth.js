const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Login route (for demonstration purposes)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Mock user check - replace with database user verification
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
