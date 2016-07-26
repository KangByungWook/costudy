var Product = require('mongoose').model('Product');
exports.render = function(req, res){
  if (req.session.lastVisit){
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();
  Product.find({}, function(err, products){
    if(err){
      res.send(err);
    }else{
      res.render('index',{
        title: 'Hello world',
        user: req.user || '',
        products: products
      });
    }
  })

};
