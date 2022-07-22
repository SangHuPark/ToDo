const Todo = require('../models/todo.js');

exports.insertTodo = async (newTodoInfo) => {
    const {
        date, title, content, user_id
    } = newTodoInfo;
    

    const newTodo = await Todo
        .create({
        date : date,
        title : title,
        content : content,
        owner_id : user_id
        })
        .then((result) => { // 투두 추가 성공 시
            return result;
        })
        .catch((err) => { // 투두 추가 실패 시
            throw new Error(err);
        });

    return newTodo;
}

exports.existTodo = async (findTodoInfo) => {
    const { 
        date, user_id 
    } = findTodoInfo;
    
    const findResult = await Todo.findAll({ 
        attributes : [ 'id', 'date', 'title', 'content' ],
        where : { date : date, owner_id : user_id } });

    return findResult;
}

exports.deleteService = async (deleteId, user_id) => {
    const deleteResult = await Todo
        .findOne({
            attributes : [ 'date', 'title', 'content' ],
            where : { id : deleteId, owner_id : user_id }
        })
        .catch((err) => {
            throw new Error(err);
        });
    
    await Todo.destroy({
        where : { id : deleteId }
    });

    return deleteResult;
}

exports.patchService = async (patchTodoInfo, user_id) => {
    const { 
        id, date, title, content
    } = patchTodoInfo;

    const patchResult = await Todo
        .update({
            date: date,
            title: title,
            content: content
        },
        { 
            attributes : [ 'date', 'title', 'content' ],
            where : { id : id, owner_id : user_id } 
        })
        .catch((err) => {
            throw new Error(err);
        });

    return patchResult;
}