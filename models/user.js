const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
      },
      user_pw: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      pw_salt: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Todo, { foreignKey : "owner_id", sourceKey : "user_id"});
  }
};
