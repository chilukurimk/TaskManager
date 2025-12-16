const Task = require('../models/Task');

// Create a new task
exports.createTask = (req, res) => {
  const { name, date, time, description } = req.body || {};

  if (!name || !date || !time) {
    return res.status(400).json({ error: 'name, date, and time are required' });
  }

  const task = Task.create({ name, date, time, description });
  res.status(201).json(task);
};

// Get all tasks
exports.getAllTasks = (req, res) => {
  const tasks = Task.getAll();
  res.json(tasks);
};

// Get a single task
exports.getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

// Update a task
exports.updateTask = (req, res) => {
  const { name, date, time, description, status } = req.body || {};
  const task = Task.update(req.params.id, { name, date, time, description, status });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
};

// Delete a task
exports.deleteTask = (req, res) => {
  const deleted = Task.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ ok: true, message: 'Task deleted successfully' });
};

// Add a comment to a task
exports.addComment = (req, res) => {
  const { text } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  const comment = Task.addComment(req.params.id, text);

  if (!comment) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(201).json(comment);
};
