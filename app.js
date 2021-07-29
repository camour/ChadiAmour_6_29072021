const express=require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect('mongodb+srv://camour:an6Efx=3@cluster0.yjtgl.mongodb.net/soPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
//app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;