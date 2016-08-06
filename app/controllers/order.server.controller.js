var Product = require('mongoose').model('Product'),
  User = require('mongoose').model('User');

exports.renderOrderPage = function(req, res, next) {
  if(!req.user){
    res.redirect('/');
  }
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
  if (!req.user) {
    res.redirect('/');
  } else{
    Product.find({
        _id: id
      })
      .populate('leader')
      .populate('enrolledPeople.enrolledBy')
      .exec(function(error, products) {
        if (error) {
          return next(error);
        } else {
          var product = products[0]
          // 배열값으로 주기때문에 [0]을 붙여야댐!!
          req.product = JSON.stringify(product);
          next();
        }
      });
  };

};


exports.enroll = function(req, res, next, id) {
  if (!req.user) {
    res.redirect('/');
  }

  Product.findOneAndUpdate({
    _id: id
  }, {
    $addToSet: {
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
        $addToSet: {
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
    $addToSet: {
      "bookmarkedPeople": req.user._id
    }
  }, function(err, product) {
    if (err) {
      return next(err);
    } else {
      // 유저의 스터디 리스트에도 추가
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $addToSet: {
          "bookmarks": product._id
        }
      }, function(err, user){
        req.user = user;
      });
      req.product = product;
      next();
    }
  });
}

exports.returnJsonData = function(req, res, next){
  res.json(req.user);
}
