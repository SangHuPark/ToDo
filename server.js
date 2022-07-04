const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const indexRouter = require('./routes/index.js');
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

app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} Not Found`);
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
  
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "port connected!!");
});