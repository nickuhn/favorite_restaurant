'use strict';

module.exports = function(app) {
  require('./controllers/restaurants_controller')(app);
};
