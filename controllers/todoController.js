const User = require('../models/user.js');
const Todo = require('../models/todo.js');

const todoService = require('../service/todoService.js');
const util = require('../function/replyFunc.js');

exports.addTodo = async (req, res, next) => {
    const { date, title, content } = req.body;
    const user_id = req.decoded.user_id;

    var reply = {};

    if(!date || !title || !content)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

    try {
        const newTodoInfo = { date, title, content, user_id };
        const newTodo = await todoService.insertTodo(newTodoInfo);

        return res.json(util.makeReply(reply, true, 200, '새로운 Todo가 추가되었습니다.'));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.findTodo = async (req, res, next) => {
    const date = req.body.date;
    const user_id = req.decoded.user_id;

    var reply = {};
    var dataReply = {};

    try{
        const findTodoInfo = { date, user_id };
        const findedTodo = await todoService.existTodo(findTodoInfo);

        return res.json(util.dataReply(dataReply, true, 200, '조회된 Todo List 입니다.', { findedTodo }));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.deleteTodo = async (req, res, next) => {
    const deleteId = req.body.id;
    const user_id = req.decoded.user_id;
    console.log(user_id);

    var dataReply = {};

    try {
        const deletedTodo = await todoService.deleteService(deleteId, user_id);

        return res.json(util.dataReply(dataReply, true, 'ToDo 가 삭제되었습니다.', { deletedTodo }));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.patchTodo = async (req, res, next) => {
    const { 
        id, date, title, content 
    } = req.body;
    const user_id = req.decoded.user_id;

    reply = {};
    var dataReply = {};

    try{
        const patchTodoInfo = { id, date, title, content };
        const patchedTodo = await todoService.patchService(patchTodoInfo, user_id);

        return res.json(util.dataReply(dataReply, true, 'ToDo 가 수정되었습니다.', { patchedTodo }));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}