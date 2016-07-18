var order = require('../controllers/order.server.controller');
var product = require('../controllers/products.server.controller');

module.exports = function(app){
  app.route('/product/:product_id/order').get(order.renderOrder);
  app.param('product_id', product.productById);
}
