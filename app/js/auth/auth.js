'use strict'

module.exports = function(app) {
  require('./controllers/auth_controller.js')(app);
  require('./services/auth_service.js')(app);
}
