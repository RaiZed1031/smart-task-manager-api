const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let tasks = [];

app.get("/", (req, res) => {
  res.send("Smart Task Manager API is running");
});

app.post("/register", (req, res) => {
  const user = {
    id: users.length + 1,
    username: req.body.username
  };

  users.push(user);

  res.status(201).json(user);
});

app.post("/login", (req, res) => {
  const user = users.find(
    u => u.username === req.body.username
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid login"
    });
  }

  res.json({
    message: "Login successful",
    user
  });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(
    t => t.id === Number(req.params.id)
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title = req.body.title || task.title;
  task.completed =
    req.body.completed ?? task.completed;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(
    t => t.id !== Number(req.params.id)
  );

  res.json({
    message: "Task deleted"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Application is healthy"
  });
});

module.exports = app;