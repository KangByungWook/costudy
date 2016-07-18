var products = require('../../app/controllers/products.server.controller');

module.exports = function(app){
  app.route('/product').get(products.index);

  app.route('/product/:product_id').get(products.productRead);
  app.param('product_id', products.productById);

  app.route('/product/theme/:theme_id').get(products.themeRead);
  app.param('theme_id', products.themeById);
}
