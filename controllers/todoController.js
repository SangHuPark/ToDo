const User = require('../models/user.js');
const Todo = require('../models/todo.js');

const todoService = require('../service/todoService.js');
const util = require('../function/replyFunc.js');

exports.addTodo = async (req, res, next) => {
    const { date, title, content } = req.body;
    const owner_id = req.decoded.user_id;

    var reply = {};

    if(!date || !title || !content)
    return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

    try {
        const newTodoInfo = { date, title, content, owner_id };
        const newTodo = await todoService.insertTodo(newTodoInfo);

        return res.json(util.makeReply(reply, true, 200, '새로운 Todo가 추가되었습니다.'));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.findTodo = async (req, res, next) => {
    const 
}