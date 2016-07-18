var faq = require('../controllers/faq.server.controller');

module.exports = function(app){
  app.route('/faq').get(faq.renderFaq);
}
