import React, { useState } from "react";
import axios from "axios";

const ShipmentForm = ({ onFormSubmit }) => {
  // State to hold form values
  const [shipmentId, setShipmentId] = useState("");
  const [customerId, setCustomerId] = useState(""); // Added customerId state
  const [carrier, setCarrier] = useState(""); // Added carrier state
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate that required fields are filled
    if (!customerId || !carrier) {
      console.error("Customer ID and Carrier are required");
      return;
    }

    // Construct the shipment object
    const newShipment = {
      shipmentId,
      customerId, // Ensure customerId is included
      carrier, // Ensure carrier is included
      destination,
      status,
    };

    // Send the data to the backend (POST request)
    axios
      .post("http://localhost:5000/api/shipments", newShipment) // Ensure this URL is correct for creating a shipment
      .then((response) => {
        console.log("Shipment added:", response.data);
        onFormSubmit(); // Callback to update the shipment list after form submission
      })
      .catch((error) => {
        console.error("Error adding shipment:", error);
      });

    // Reset the form
    setShipmentId("");
    setCustomerId(""); // Reset customerId
    setCarrier(""); // Reset carrier
    setDestination("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Shipment ID</label>
        <input
          type="text"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Customer ID</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Carrier</label>
        <input
          type="text"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <button type="submit">Add Shipment</button>
    </form>
  );
};

export default ShipmentForm;
