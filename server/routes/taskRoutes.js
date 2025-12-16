const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task CRUD operations
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Comment operations
router.post('/:id/comments', taskController.addComment);

module.exports = router;
