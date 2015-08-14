var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  name: String,
  rating: Number,
  cuisine: String,
  location: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
