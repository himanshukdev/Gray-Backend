/* eslint-disable no-console */
const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('./passport-config');
const session = require('express-session');

const AddTaskRouter = require('./routes/task.router');
const AuthRouter = require('./routes/auth.router');

dotenv.config();

app.use(
  cors({
    origin: process.env.client_domain_url, // Replace with your React app's URL
    credentials: true, // Enable credentials (cookies) for cross-origin requests
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome to task Universe');
});

app.use('/task', AddTaskRouter);
app.use('/auth', AuthRouter);

mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${process.env.PORT}`);
});
