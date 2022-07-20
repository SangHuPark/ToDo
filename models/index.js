const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user.js');
const Todo = require('./todo.js');
const Schedule_bundle = require('./schedule_bundle.js');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config, /*{
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    timezone: "Asia/Seoul",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  }*/);

db.sequelize = sequelize;
db.User = User;
db.Todo = Todo;
db.Schedule_bundle = Schedule_bundle;

User.init(sequelize);
Todo.init(sequelize);
Schedule_bundle.init(sequelize);


User.associate(db);
Todo.associate(db);
Schedule_bundle.associate(db);

module.exports = db;