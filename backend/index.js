// Load environment variables
require("dotenv").config();

// Import necessary packages
const express = require("express");
const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { OpenAI } = require("openai");
const shipmentRoute = require("./routes/shipments"); // Import the shipments route

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Use CORS to allow requests from the frontend (React app running on localhost:3000)
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use shipmentRoute for handling all requests starting with /api/shipments
app.use("/api/shipments", shipmentRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure retry for axios
axiosRetry(axios, {
  retries: 5, // Retry 5 times
  retryDelay: axiosRetry.exponentialDelay, // Use exponential backoff
  retryCondition: (error) => {
    return error.response && error.response.status === 429; // Retry only on rate-limiting
  },
});
// Compliance Check Endpoint (to check text for compliance issues)
app.post("/check-compliance", async (req, res) => {
  const { text, category } = req.body; // Extract text and category from the request body
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Check the following text for compliance issues related to ${category}: ${text}`,
        },
      ],
    });
    res.json({ result: response.choices[0].message.content.trim() }); // Return the compliance check result
  } catch (error) {
    console.error(error);
    res.status(500).send("AI Compliance check failed.");
  }
});

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection and events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for chat messages from users
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message); // Emit chat message to all connected clients
  });

  // Listen for user disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
