exports.index = function(req, res, next) {
  res.render('product/product', {
    title: 'product'
  });
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
