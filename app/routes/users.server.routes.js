var users = require('../../app/controllers/users.server.controller'),
passport = require('passport');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

module.exports = function(app){
  app.get('/signup', users.renderSignup);
  app.post('/signup', upload.single('image'), users.signup);
  // app.route('/signup').get(users.renderSignup).post(users.signup);

  app.route('/signin').get(users.renderSignin).post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.get('/signout', users.signout);

  app.route('/users').get(users.list);

  app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

  app.param('userId', users.userByID);

  //facebook 로그인
  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    scope : ['email']
  }));
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/',
    scope : ['email']
  }));
}

// CRUD
// module.exports = function(app){
//
//   app.route('/users').post(users.create).get(users.list);
//
//   app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
//
//   app.param('userId', users.userByID);
// }
