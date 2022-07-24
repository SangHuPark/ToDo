const express = require('express');

const { auth } = require('../auth/jwt.js');
const todoController = require('../controllers/todoController.js')

const router = express.Router();

router.route('/:date').get(auth, todoController.findTodo);
router.route('/')
    .get(auth, todoController.allTodo)
    .post(auth, todoController.addTodo)
    .delete(auth, todoController.deleteTodo)
    .patch(auth, todoController.patchTodo);

module.exports = router;