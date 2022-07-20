const Sequelize = require('sequelize');

module.exports = class Schedule_bundle extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      owner: {
        type: Sequelize.STRING(10),
        primaryKey: true
      },
      month_pocket: {
        type: Sequelize.INTEGER(10),
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
    db.Schedule_bundle.belongsTo(db.User, { foreignKey: 'owner', targetKey: 'user_id' });

    db.Schedule_bundle.hasMany(db.Todo, { foreignKey: ['owner_bundle', 'month_bundle'], sourceKey: ['owner', 'month_pocket']})
  }
};