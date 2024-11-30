import React, { useState } from "react";
import ShipmentList from "./components/ShipmentList";
import Chat from "./components/Chat";
import DocumentUpload from "./components/DocumentUpload";
import TrackingDashboard from "./components/TrackingDashboard";
import ShipmentForm from "./components/ShipmentForm"; // Import the ShipmentForm component
import "./App.css";

function App() {
  const [refreshShipments, setRefreshShipments] = useState(false);

  // Callback to refresh the shipment list
  const handleShipmentFormSubmit = () => {
    setRefreshShipments((prevState) => !prevState); // Toggle refresh flag
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>FreshFruits Export Management</h1>
      </header>
      <div className="dashboard">
        <section className="section shipments">
          <h2>Shipments</h2>
          {/* Add Shipment Form */}
          <ShipmentForm onFormSubmit={handleShipmentFormSubmit} />
          {/* List of Shipments */}
          <ShipmentList refreshShipments={refreshShipments} />
        </section>
        <section className="section chat">
          <h2>Real-Time Chat</h2>
          <Chat />
        </section>
        <section className="section upload">
          <h2>Upload Document</h2>
          <DocumentUpload />
        </section>
        <section className="section tracking-dashboard">
          <h2>Shipment Tracking Dashboard</h2>
          <TrackingDashboard />
        </section>
      </div>
    </div>
  );
}

export default App;
