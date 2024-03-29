'use strict';


// load modules
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./models');
const morgan = require('morgan');
const users = require('./routes/users');
const courses = require('./routes/courses');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(cors());
// setup morgan which gives us http request logging
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

// TODO setup your api routes here
app.use('/api', courses);
app.use('/api', users);

//Testing DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB succesful!!');

    //sync the models - leaving this here to help with testing if a db refresh is needed.
    //console.log('Synchronizing the models with the database...');
    //await sequelize.sync({ force: true });

  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port} and cors`);
});