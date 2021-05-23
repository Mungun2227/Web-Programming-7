const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/users');
const tasks = require('./routes/tasks');
require('./config/passport')(passport);

const app = express();

const port = 5000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use(passport.initialize());

app.use('/api/users', users);
app.use('/api/tasks', tasks);

app.listen(port, () => console.log('Server up and running on port', port));
