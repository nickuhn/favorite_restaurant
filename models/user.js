var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurants: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}]
});

userSchema.methods.createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.verifyPassword = function(password) {
  console.log(password,this.password);
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

