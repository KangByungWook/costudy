var Faq = require('mongoose').model('Faq');
// 질문답변 게시판 render
exports.renderFaq = function(req, res, next) {
  Faq.find().populate('postedBy')
    .exec(function(error, faqs) {
      if (error) {
        return next(error);
      } else {
        res.render('faq/faq', {
          user: req.user || '',
          faqs: faqs
        });
      }
    });
}

exports.renderFaqDetail = function(req, res, next) {
  res.render('faq/faq_detail', {
    user: req.user || '',
    faq: req.faq
  })
}

exports.FaqById = function(req, res, next, id) {
  Faq.find({
      _id: id
    }).populate('postedBy')
    .exec(function(error, faq) {
      if (error) {
        return next(error);
      } else {
        req.faq = faq;
        next();
      }
    });
}
