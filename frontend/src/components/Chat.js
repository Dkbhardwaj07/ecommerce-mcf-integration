// Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to your backend server

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const handleSend = async () => {
    if (message) {
      try {
        const response = await fetch("http://localhost:5000/check-compliance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message }),
        });
        const data = await response.json();

        if (data.result.includes("compliant")) {
          // Customize based on AI response
          socket.emit("chatMessage", message);
        } else {
          alert("Message may violate compliance guidelines.");
        }
      } catch (error) {
        console.error("Compliance check failed:", error);
      }
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
