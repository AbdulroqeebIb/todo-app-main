const express = require("express");
const app = express();
const PORT = 3000;

// Allow our server to read JSON information sent from the frontend
app.use(express.json());

// Tell Express to automatically serve your index.html, style.css, and app.js
app.use(express.static(__dirname));

// A quick test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello! The server engine is running flawlessly." });
});

// =========================================================================
// 📥 DATA PIPELINE: This captures tasks sent over the network
// =========================================================================

// This array acts as our temporary backend database storehouse
let serverTodoDatabase = [];

// Route: Listen for the frontend sending a new task package
app.post("/api/todos", (req, res) => {
  const newTodoTask = req.body;

  console.log(
    "📥 WOW! A task package just arrived at the server:",
    newTodoTask,
  );

  // Add the new task package to our server array database
  serverTodoDatabase.push(newTodoTask);

  // Send a message back to the frontend confirming it arrived safely
  res.status(201).json({
    message: "Success! Task captured by backend database.",
    totalTasksStored: serverTodoDatabase.length,
  });
});

// =========================================================================
// 🚀 ENGINE START: The server stays at the bottom listening for requests
// =========================================================================
app.listen(PORT, () => {
  console.log(`🚀 Server is listening live at http://localhost:${PORT}`);
});
