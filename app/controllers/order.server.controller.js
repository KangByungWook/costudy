exports.renderOrder = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('order/order', {
    user: req.user,
    product: req.product_data
  });
}
