const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const loginRouter = require('./routes/loginRouter.js');
const enrollRouter = require('./routes/enrollRouter.js');
const todoRouter = require('./routes/todoRouter.js');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);
sequelize.sync({ force: false })
  .then(() => {
    console.log('DB Connected !!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/login', loginRouter);
app.use('/enroll', enrollRouter);
app.use('/todo', todoRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "port connected!!");
});