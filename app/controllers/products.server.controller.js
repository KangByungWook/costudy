var Product = require('mongoose').model('Product');

exports.index = function(req, res, next) {
  if(!req.user){
    res.render('signin',{
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  }else{
    res.render('product/product', {
      title: 'product',
      user: req.user
    });
  }
}

exports.productRead = function(req, res, next) {
  res.render('product/product_detail', {
    product_data: req.product_data
  });

}

exports.productById = function(req, res, next, id) {
  //id를 통해 찾은 데이터를 req.product에 삽입
  req.product_data = {
    id: id
  }
  next();
}

exports.themeRead = function(req, res, next) {
  //id를 통해 찾은 theme데이터를 req.prouct에 삽입
  res.render('product/theme/theme',{
    data: req.data
  });
}

exports.themeById = function(req, res, next, id){
  req.data = {
    id: id
  }
  next();
}

// CRUD
exports.create = function(req, res, next){
  var product = new Product(req.body);
  product.save(function(err){
    if(err){
      return next(err);
    }else{
      res.json(product);
    }
  });
};

exports.read = function(req, res){
  res.json(req.product);
};

exports.productByID = function(req, res, next, id){
  Product.findOne({
    _id:id
  }, function(err, product){
    if(err){
      return next(err);
    }else{
      req.product = product;
      next();
    }
  })
};

exports.update = function(req, res, next){
  Product.findByIdAndUpdate(req.product.id, req.body, function(err, product){
    if(err){
      return next(err);
    } else{
      res.json(product);
    }
  });
}

exports.delete = function(req, res, next){
  req.product.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.product);
    }
  });
}
