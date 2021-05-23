const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/todos/:userid', toDoController.getTodosById);
router.get('/todos', toDoController.getAllTodos);
router.put('/todo/:taskid', toDoController.updateTodoById);
router.delete('/todo/:taskid', toDoController.deleteTodoById);
router.post('/todo/createTask', toDoController.createTodo);

module.exports = router;
