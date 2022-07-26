const Todo = require('../models/todo.js');

exports.insertTodo = async (newTodoInfo) => {
    const {
        date, title, content, user_id
    } = newTodoInfo;
    
    // Todo.sequelize.connectionManager.initPools();

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

    // Todo.sequelize.connectionManager.close();

    return newTodo;
}

exports.homeTodo = async (user_id) => {
    // Todo.sequelize.connectionManager.initPools();

    const findAllTodo = await Todo.findAll({
        attributes : [ 'date' ],
        where : { owner_id : user_id }
    });

    // Todo.sequelize.connectionManager.close();

    return findAllTodo;
}

exports.existTodo = async (findTodoInfo) => {
    const { 
        date, user_id 
    } = findTodoInfo;

    // Todo.sequelize.connectionManager.initPools();
    
    const findResult = await Todo.findAll({ 
        attributes : [ 'id', 'date', 'title', 'content' ],
        where : { date : date, owner_id : user_id } 
    });

    // Todo.sequelize.connectionManager.close();

    return findResult;
}

exports.deleteService = async (deleteId, user_id) => {
    // Todo.sequelize.connectionManager.initPools();

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

    // Todo.sequelize.connectionManager.close();
    console.log(deleteResult);
    
    return deleteResult;
}

exports.patchService = async (patchTodoInfo, user_id) => {
    const { 
        id, date, title, content
    } = patchTodoInfo;

    // Todo.sequelize.connectionManager.initPools();

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

    // Todo.sequelize.connectionManager.close();

    return patchResult;
}