const express = require("express");
const router = express.Router();

// Mock data for shipment
const shipments = [
  { id: 1, carrier: "DHL", status: "In Transit" },
  { id: 2, carrier: "FedEx", status: "Delivered" },
];

// Get all shipments
router.get("/shipments", (req, res) => {
  res.json(shipments);
});

module.exports = router;
