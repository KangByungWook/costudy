var order = require('../controllers/order.server.controller');
var product = require('../controllers/products.server.controller');

module.exports = function(app){
  app.route('/product/:product_id/order').get(order.renderOrderPage);
  app.param('product_id', order.productById);

  app.route('/product/:order_done_product_id/order_done').get(order.renderOrderDonePage);
  app.param('order_done_product_id', order.enroll);

}
