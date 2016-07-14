var passport = require('passport'),
mongoose = require('mongoose');

module.exports = function(){
  var User = mongoose.model('User');

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  // password 속성과 salt속성 제외
  passport.deserializeUser(function(id, done){
    User.findOne({
      _id: id
    },'-password -salt', function(err, user){
      done(err,user);
    });
  });

  require('./strategies/local.js')();
}
