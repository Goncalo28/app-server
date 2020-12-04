require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

mongoose
  .connect('mongodb://localhost/app-server', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'meshitup',
  cookie: { expire: 60000 },
  rolling: true
}));


app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_HOSTNAME]
  })
);

app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = 'APP_SERVER';

const auth = require('./routes/auth');
app.use('/api', auth);

const user = require('./routes/user');
app.use('/api', user);

const connection = require('./routes/connection');
app.use('/api', connection);

const posts = require('./routes/posts');
app.use('/api', posts);

module.exports = app;
