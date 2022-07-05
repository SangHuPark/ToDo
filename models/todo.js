const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(140),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todolist',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Todo.belongsTo(db.User);
  }
};
