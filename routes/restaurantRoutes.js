'use strict';

var bodyParser = require('body-parser');
var Restaurant = require(__dirname + '/../models/restaurant');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.get('/restaurants', function(req, res) {
    Restaurant.find({}, function(err, data){
      if (err) {
        return res.status(404).json({msg:'Unable to find page'});
      }
      res.json(data);
    });
  });

  router.get('/restaurants/:id', function(req, res) {
    Restaurant.find({'_id': req.params.id}, function(err, data){
      if (err) {
        return res.status(404).json({msg:'Unable to find page'});
      }
      res.json(data);
    });
  });

  router.post('/restaurants/', function(req, res) {
    var newRest = new Restaurant(req.body);
    newRest.save(function(err) {
      if (err) {
        return res.status(500).json({msg:'error saving file'});
      }
      res.json(req.body);
    });
  });

  router.put('/restaurants/:id', function(req, res) {
    Restaurant.update({'_id': req.params.id}, req.body, function(err, data){
      if (err) {
       return res.status(404).json({msg:'error saving file'});
      }
      res.json(data);
    });
  });

  router.delete('/restaurants/:id', function(req, res) {
    Restaurant.remove({'_id': req.params.id}, function(err){
      if (err) {
        return res.status(500).json({msg:'error deleting file'});
      }
      res.json({msg:'Deleted Successfully'});
    });
  });
};
