var faq = require('../controllers/faq.server.controller');

module.exports = function(app){
  app.route('/faq').get(faq.renderFaq);

  //질문답변 상세 페이지
  app.route('/faq/:faq_id').get(faq.renderFaqDetail);
  app.param('faq_id', faq.FaqById);
}
