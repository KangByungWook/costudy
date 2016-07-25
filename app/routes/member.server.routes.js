var member = require('../controllers/member.server.controller');

module.exports = function(app){
  app.route('/member/bookmark').get(member.bookmark);

  app.route('/member/credit-and-coupon').get(member.credit_and_coupun);

  app.route('/member/edit').get(member.edit);
  app.route('/member/update').post(member.update);

  app.route('/member/product').get(member.product);

  app.route('/member/transaction').get(member.transaction);

}
