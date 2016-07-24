var Product = require('mongoose').model('Product');

exports.renderOrderPage = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('order/order', {
    user: req.user,
    product: req.product
  });
}

exports.renderOrderDonePage = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('order/order_done', {
    user: req.user,
    product: req.product
  });
}

exports.productById = function(req, res, next, id) {
  if(!req.user){
    res.redirect('/');
  }
  Product.findOne({
    _id:id
  }, function(err, product){
    if(err){
      return next(err);
    }else{
      req.product = product;
      next();
    }
  });
}


exports.enroll = function(req, res, next, id) {
  if(!req.user){
    res.redirect('/');
  }

  Product.findOne({
    _id:id
  }, function(err, product){
    if(err){
      return next(err);
    }else{
      // 등록하는 회원정보 추가
      var newMemberInfo = {
        introduction: '안녕하세요',
        contact: '01012341234',
        enrolledBy: req.user._id
      };
      product.enrolledPeople.push(newMemberInfo);

      Product.findByIdAndUpdate(product.id, product, function(err, product){
        if(err){
          return next(err);
        } else{
          req.product = product;
        }
      });

      next();
    }
  });
}
