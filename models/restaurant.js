var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  name: String,
  rating: Number,
  cuisine: String,
  location: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
