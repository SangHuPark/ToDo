const Todo = require('../models/todo.js');

exports.insertTodo = async (newTodoInfo) => {
    const {
        date, title, content, owner_id
    } = newTodoInfo;

    const newTodo = await Todo
        .create({
        date: date,
        title: title,
        content: content,
        owner_id: owner_id
        })
        .then((result) => { // 투두 추가 성공 시
            return result;
        })
        .catch((err) => { // 투두 추가 실패 시
            throw new Error(err);
        });

    return newTodo;
}