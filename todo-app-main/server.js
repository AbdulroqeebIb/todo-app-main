const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // <-- MUST BE INCLUDED
app.use(express.json());
app.use(express.static(__dirname));

// A quick test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello! The server engine is running flawlessly." });
});

// Temporary in-memory database storehouse
let serverTodoDatabase = [];

// 📥 DATA PIPELINE: REST API ENDPOINTS

// 1. GET ALL TODOS: Sends all saved tasks back to the frontend on page load
app.get("/api/todos", (req, res) => {
  res.json(serverTodoDatabase);
});

// 2. CREATE TODO: Receives a new task package from the frontend
app.post("/api/todos", (req, res) => {
  const newTodoTask = req.body;

  console.log("📥 A task package arrived at the server:", newTodoTask);

  // Add the new task package to our server array database
  serverTodoDatabase.push(newTodoTask);

  res.status(201).json({
    message: "Success! Task captured by backend database.",
    todo: newTodoTask,
    totalTasksStored: serverTodoDatabase.length,
  });
});

// 3. TOGGLE COMPLETED STATUS: Updates a task's state by ID
app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = serverTodoDatabase.find((item) => item.id == id);

  if (todo) {
    todo.completed = !todo.completed;
    res.json({ message: "Task status updated successfully.", todo });
  } else {
    res.status(404).json({ error: "Task not found." });
  }
});

// 4. DELETE TODO: Removes a task from the database by ID
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  serverTodoDatabase = serverTodoDatabase.filter((item) => item.id != id);

  res.json({
    message: "Task deleted successfully.",
    totalTasksStored: serverTodoDatabase.length,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening live at http://localhost:${PORT}`);
});
