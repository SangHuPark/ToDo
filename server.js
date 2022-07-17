const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const loginRouter = require('./routes/loginRouter.js');
const enrollRouter = require('./routes/enrollRouter.js');
const authRouter = require('./routes/authRouter.js');
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
app.use('/auth', authRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "port connected!!");
});