const express = require('express');

const { auth } = require('../auth/authMiddleware.js');
const todoController = require('../controllers/todoController.js')

const router = express.Router();

router.route('/')
    .get(auth, todoController.findTodo)
    .post(auth, todoController.addTodo)
    .delete(auth, todoController.deleteTodo)
    .patch(auth, todoController.patchTodo);

module.exports = router;