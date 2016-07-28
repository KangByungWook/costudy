var order = require('../controllers/order.server.controller');
var product = require('../controllers/products.server.controller');

module.exports = function(app){
  app.route('/product/:product_id/order').get(order.renderOrderPage);
  app.param('product_id', product.productById);

  // 등록 완료
  app.route('/product/:order_done_product_id/order_done').post(order.renderOrderDonePage);
  app.param('order_done_product_id', order.enroll);

  // 북마크 추가
  app.route('/product/:bookmark_product_id/bookmark').get(order.renderOrderDonePage);
  app.param('bookmark_product_id', order.addBookmark);

}
