// routes/shipments.js
const express = require("express");
const router = express.Router();
const upload = require("../upload");
const Shipment = require("../models/Shipment"); // Import the Shipment model

// Upload a shipment document
router.post("/upload", upload.single("document"), (req, res) => {
  if (req.file) {
    res.status(200).json({ fileUrl: req.file.location });
  } else {
    res.status(500).json({ error: "File upload failed" });
  }
});

// Create a new shipment
router.post("/", async (req, res) => {
  const { shipmentId, customerId, carrier, destination, status, documentUrl } =
    req.body;

  if (!customerId || !carrier) {
    return res
      .status(400)
      .json({ error: "Customer ID and Carrier are required" });
  }

  try {
    const newShipment = new Shipment({
      shipmentId,
      customerId,
      carrier,
      destination,
      status,
      documentUrl,
    });

    await newShipment.save();
    res.status(201).json({
      message: "Shipment created successfully",
      shipment: newShipment,
    });
  } catch (error) {
    console.error("Error saving shipment:", error);
    res
      .status(500)
      .json({ error: "Error creating shipment", details: error.message });
  }
});

// Get all shipments
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    console.error("Error fetching shipments:", error);
    res.status(500).json({ error: "Error fetching shipments" });
  }
});

// Get a specific shipment by shipmentId
router.get("/:shipmentId", async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      shipmentId: req.params.shipmentId,
    });
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.status(200).json(shipment);
  } catch (error) {
    console.error("Error fetching shipment:", error);
    res.status(500).json({ error: "Error fetching shipment" });
  }
});

// Update a shipment's status
router.put("/:shipmentId", async (req, res) => {
  const { status } = req.body;
  // Ensure valid status before updating
  const validStatuses = ["shipped", "delivered", "in transit", "pending"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const shipment = await Shipment.findOneAndUpdate(
      { shipmentId: req.params.shipmentId },
      { status },
      { new: true, runValidators: true }
    );
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.status(200).json({
      message: "Shipment status updated successfully",
      shipment,
    });
  } catch (error) {
    console.error("Error updating shipment:", error);
    res.status(500).json({ error: "Error updating shipment" });
  }
});

// Update shipment details
router.put("/update/:id", async (req, res) => {
  const { shipmentId, customerId, carrier, destination, status } = req.body;

  try {
    const updatedShipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { shipmentId, customerId, carrier, destination, status },
      { new: true } // Returns the updated document
    );
    if (!updatedShipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.status(200).json({
      message: "Shipment updated successfully",
      shipment: updatedShipment,
    });
  } catch (error) {
    console.error("Error updating shipment:", error);
    res.status(500).json({ error: "Error updating shipment" });
  }
});

// Delete a shipment (consolidated route)
router.delete("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.status(200).json({
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shipment:", error);
    res.status(500).json({ error: "Error deleting shipment" });
  }
});

module.exports = router;
