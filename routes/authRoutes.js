'use strict';

var jwt = require('jsonwebtoken');
var User = require('../models/user');
var bodyParser = require('body-parser');

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/signin', function(req, res) {
    console.log('server signin', req.body);
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) {
        res.status(500).json({success: false, msg: 'Server Error'});
      } else {
        if (!user) {
          res.json({success: false, msg: 'Invalid username'});
        } else if (!user.verifyPassword(req.body.password)) {
          res.json({success: false, msg: 'Invalid password'});
        } else {
          var token = jwt.sign(user, 'CHANGEME', {expiresInMinutes: 14444440});
          res.json({success: true, msg: 'Authentication successfull', token: token});
        }
      }
    });
  });

  router.post('/signup', function(req, res) {
    var user = new User(req.body);
    user.password = user.createHash(user.password);
    user.save(function(err, data) {
      if (err) {
        res.status(500).json({success: false, msg: 'Error saving new user', error: err});
      } else {
        var token = jwt.sign(user, 'CHANGEME', {expiresInMinutes: 14444440});
        res.json({success: true, msg: 'Authentication successful', token: token, data: data});
      }
    });
  });
}
