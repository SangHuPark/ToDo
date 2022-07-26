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

exports.allTodo = async (req, res, next) => {
    const user_id = req.decoded.user_id;

    var reply = {};
    var dataReply = {};

    try {
        const findedAllTodo = await todoService.homeTodo(user_id);

        return res.json(util.dataReply(dataReply, true, 200, '해당 사용자의 전체 Todo List 입니다.', { findedAllTodo }));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.findTodo = async (req, res, next) => {
    const date = req.params.date;
    const user_id = req.decoded.user_id;

    var reply = {};
    var dataReply = {};

    try{
        const findTodoInfo = { date, user_id };
        const findedTodo = await todoService.existTodo(findTodoInfo);
        
        if( findedTodo.length === 0 )
            return res.json(util.makeReply(reply, true, 200, "해당 날짜에는 아직 생성한 Todo 가 존재하지 않습니다."));

        return res.json(util.dataReply(dataReply, true, 200, '조회된 Todo List 입니다.', { findedTodo }));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}

exports.deleteTodo = async (req, res, next) => {
    const deleteId = req.body.id;
    const user_id = req.decoded.user_id;

    var dataReply = {};

    try {
        if(!deleteId || !user_id)
            return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

        const deletedTodo = await todoService.deleteService(deleteId, user_id);
        
        return res.json(util.dataReply(dataReply, true, 200, 'ToDo 가 삭제되었습니다.', { deletedTodo }));
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

    try{
        if(!id || !date || !title || !content || !user_id)
            return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

        const patchTodoInfo = { id, date, title, content };
        await todoService.patchService(patchTodoInfo, user_id);

        return res.json(util.dataReply(reply, true, 200, 'ToDo 가 수정되었습니다.'));
    } catch (err) {
        console.log(err);

        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}