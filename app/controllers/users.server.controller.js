var User = require('mongoose').model('User'),
passport = require('passport');

var getErrorMessage = function(err){
  var message = '';

  if(err.code){
    switch(err.code){
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something wrong';
    }
  } else{
    for( var errName in err.errors){
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.renderSignin = function(req, res, next){
  if(!req.user){
    res.render('signin',{
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else{
    return res.redirect('/');
  }
};

exports.renderSignup = function(req, res, next){
  if(!req.user){
    res.render('signup',{
      title: 'Sign-up Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function(req, res, next){
  if(!req.user){
    var user  = new User(req.body);
    user.set('image', req.file)
    var message = null;

    user.provider = 'local';

    user.save(function(err){
      if(err){
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.create = function(req, res, next){
  var user = new User(req.body);
  user.save(function(err){
    if(err){
      return next(err);
    }else{
      res.json(user);
    }
  });
};

exports.list = function(req, res, next){
  User.find({},function(err, users){
    if(err){
      return next(err);
    }else{
      res.json(users);
    }
  });
}

exports.read = function(req, res){
  res.json(req.user);
}

exports.userByID = function(req, res, next, id){
  User.findOne({
    _id:id
  }, function(err, user){
    if(err){
      return next(err);
    }else{
      req.user = user;
      next();
    }
  })
}

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
    if(err){
      return next(err);
    } else{
      res.json(user);
    }
  });
}

exports.delete = function(req, res, next){
  req.user.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.user);
    }
  });
}

// TODO: 이메일로 바꾸기
exports.saveOAuthUserProfile = function(req, profile, done) {
	// Try finding a user document that was registered using the current OAuth provider
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		// If an error occurs continue to the next middleware
		if (err) {
			return done(err);
		} else {
			// If a user could not be found, create a new user, otherwise, continue to the next middleware
			if (!user) {
				// Set a possible base username
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

				// Find a unique available username
				User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					// Set the available user name
					profile.username = availableUsername;

					// Create the user
					user = new User(profile);

					// Try saving the new user document
					user.save(function(err) {
						// Continue to the next middleware
						return done(err, user);
					});
				});
			} else {
				// Continue to the next middleware
				return done(err, user);
			}
		}
	});
};
