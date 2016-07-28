var Product = require('mongoose').model('Product'),
  User = require('mongoose').model('User');

exports.renderOrderPage = function(req, res, next) {
  // if(!req.user){
  //   res.redirect('/');
  // }
  res.render('order/order', {
    user: req.user,
    product: JSON.parse(req.product)
  });
}

exports.renderOrderDonePage = function(req, res, next) {
  // if(!req.user){
  //   res.redirect('/');
  // }
  res.render('order/order_done', {
    user: req.user,
    product: req.product
  });
}

exports.productById = function(req, res, next, id) {
  // if(!req.user){
  //   res.redirect('/');
  // }
  Product.findOne({
    _id: id
  }, function(err, product) {
    if (err) {
      return next(err);
    } else {
      req.product = product;
      next();
    }
  });
}


exports.enroll = function(req, res, next, id) {
  if (!req.user) {
    res.redirect('/');
  }

  Product.findOneAndUpdate({
    _id: id
  }, {
    $push: {
      "enrolledPeople": {
        introduction: req.body.introduction,
        contact: req.body.contact,
        enrolledBy: req.user._id
      }
    }
  }, {
    new: true
  }, function(err, product) {
    if (err) {
      return next(err);
    } else {
      // 유저의 스터디 리스트에도 추가
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $push: {
          "products": product._id
        }
      }, {
        new: true
      }, function(err, user){
        req.user = user;
      });
      req.product = product;
      next();
    }
  });
}

exports.addBookmark = function(req, res, next, id) {
  if (!req.user) {
    res.redirect('/');
  }

  Product.findOneAndUpdate({
    _id: id
  }, {
    $push: {
      "bookmarkedPeople": req.user._id
    }
  }, {
    new: true
  }, function(err, product) {
    if (err) {
      return next(err);
    } else {
      // 유저의 스터디 리스트에도 추가
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $push: {
          "bookmarks": product._id
        }
      }, {
        new: true
      }, function(err, user){
        req.user = user;
      });
      req.product = product;
      next();
    }
  });
}
