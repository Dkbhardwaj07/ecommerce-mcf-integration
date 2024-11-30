import React, { useEffect, useState } from "react";
import axios from "axios";

const ShipmentList = ({ refreshShipments }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // Fetch shipment data from the backend
    axios
      .get("http://localhost:5000/api/shipments") // Adjust with the correct endpoint
      .then((response) => {
        setShipments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shipments:", error);
      });
  }, [refreshShipments]); // Re-fetch data when the `refreshShipments` prop changes

  return (
    <div className="shipment-list">
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment._id}>
            <h3>{shipment.shipmentId}</h3>
            <p>Destination: {shipment.destination}</p>
            <p>Status: {shipment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentList;
