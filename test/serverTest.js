var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
process.env.MONGOLAB_URL = 'mongodb://localhost/restTest_db';
var mongoose = require('mongoose');
var server = require(__dirname + '/../server');
var Restaurant = require(__dirname + '/../models/restaurant');

chai.use(chaihttp);


describe('restaurant REST server', function() {
  var testSave;
  var id;
  beforeEach(function(done) {
    testSave = new Restaurant({ name: 'Testing house',
                                    rating: 0,
                                    cuisine: 'Testing',
                                    location: 'Testland',
                                  });
    testSave.save(function(err, data) {
      if(err) throw err;

      testSave = data;
      done();
    });
  });
  it('should return a list of restaurants from the server with a generic GET request', function(done) {
    chai.request('localhost:3000')
      .get('/api/restaurants')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should return a specific restaurant from the server', function(done) {
    id = testSave._id;
    chai.request('localhost:3000')
      .get('/api/restaurants/' + id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should have the ability to save a restaurant', function(done) {
    chai.request('localhost:3000')
      .post('/api/restaurants')
      .send({name: 'Crab House',
             rating: 5,
             cuisine: 'Seafood',
             location: 'Pikes Place',
            })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);;
        expect(res).to.be.json;
        done();
      });
  });
  it('should have the ability to update a restaurant', function(done) {
    id = testSave._id
    chai.request('localhost:3000')
      .put('/api/restaurants/' + id)
      .send({name: 'Ivars', rating: '4'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);;
        expect(res).to.be.json;
        done();
      });
  });
  it('should have the ability to delete a restaurant', function(done) {
    id = testSave._id;
    chai.request('localhost:3000')
      .del('/api/restaurants/' +id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);;
        expect(res).to.be.json;
        done();
      });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});

