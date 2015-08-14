'use strict'

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var restaurantRoutes = express.Router();
var authRoutes = express.Router();

var MONGO_URL = (process.env.MONGOLAB_URL || 'mongodb://localhost/restaurants_db');

mongoose.connect(MONGO_URL);

app.use(express.static(__dirname + '/build'));

require('./routes/restaurantRoutes')(restaurantRoutes);
require('./routes/authRoutes')(authRoutes);

app.use('/api', restaurantRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Up and running');
});
