var products = require('../../app/controllers/products.server.controller');

module.exports = function(app){
  app.route('/products').get(products.list)

  // 스터디 등록 페이지
  app.route('/product').get(products.index).post(products.create);

  app.route('/product/:product_id').get(products.productRead).put(products.update).delete(products.delete);
  app.param('product_id', products.productById);

  app.route('/product/theme/:theme_id').get(products.themeRead);
  app.param('theme_id', products.themeById);
}
