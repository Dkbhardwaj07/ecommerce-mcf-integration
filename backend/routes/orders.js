// routes/orders.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Sample order data (for demonstration purposes)
const orders = [
  {
    id: 1,
    customerId: "123",
    itemId: "fruit01",
    quantity: 10,
    status: "Pending",
  },
  {
    id: 2,
    customerId: "456",
    itemId: "fruit02",
    quantity: 5,
    status: "Shipped",
  },

  // Middleware to verify JWT
  function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
];

// Use authentication middleware for protected routes
router.get("/", authenticateToken, (req, res) => {
  res.json(orders);
});

// Create a new order
router.post("/", (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder); // Normally, you'd save to a database here
  res.status(201).json(newOrder);
});

module.exports = router;
