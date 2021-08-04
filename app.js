const express=require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');



// set CORS mecanism
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse request body since it contains JSON data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// handles all images requests
app.use('/images', express.static(path.join(__dirname, 'images')));

//handles login process
app.use('/api/auth', userRoutes);

// handles API sauces requests
app.use('/api/sauces', sauceRoutes);

module.exports = app;