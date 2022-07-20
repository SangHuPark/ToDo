const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      owner_bundle: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      month_bundle: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todo',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Todo.belongsTo(db.Schedule_bundle, { foreignKey : ['owner_bundle', 'month_bundle'], targetKey : ['owner', 'month_pocket'] });
  }
};
