var Product = require('mongoose').model('Product');

exports.renderOrderPage = function(req, res, next) {
  // if(!req.user){
  //   res.redirect('/');
  // }
  res.render('order/order', {
    user: req.user,
    product: req.product
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
  },{
    // 새로 업데이트된 데이터를 담는다
    new: true
  }, function(err, product) {
    if (err) {
      return next(err);
    } else {
      req.product = product;
      next();
    }
  });
}
