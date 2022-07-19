const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      owner: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true
      },
      month_pocket: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Schedule_bundle',
      tableName: 'schedule_bundle',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.schedule_bundle.belongsTo(db.User, { foreignKey: 'owner', targetKey: 'user_id' });
    db.schedule_bundle.hasMany(db.Todo, { foreignKey: '{ owner, month_pocket }', });
  }
};