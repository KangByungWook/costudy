var User = require('mongoose').model('User');

exports.bookmark = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('member/bookmark', {
    user: req.user
  })
}

exports.credit_and_coupun = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('member/credit-and-coupon', {
    user: req.user
  })
}

exports.edit = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('member/edit', {
    user: req.user
  })
}

exports.update = function(req, res, next) {
  User.findOneAndUpdate({
    _id: req.user.id
  },{
    $set:{
      "username": req.body.username
    }
  },{
    new: true
  },function(err, user){
    req.user = user;
    res.redirect('/member/edit');
  })
}

exports.product = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('member/product', {
    user: req.user
  })
}

exports.transaction = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  }
  res.render('member/transaction', {
    user: req.user
  })
}
