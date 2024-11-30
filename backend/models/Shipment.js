// models/Shipment.js
const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  carrier: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, default: "Pending" },
  documentUrl: { type: String }, // URL for uploaded document
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shipment", shipmentSchema);
