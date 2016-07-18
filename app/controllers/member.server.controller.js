exports.bookmark = function(req, res, next) {
  if(!req.user){
    res.redirect('/');
  }
  res.render('member/bookmark', {
    user : req.user
  })
}

exports.credit_and_coupun = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('member/credit-and-coupon', {
    user: req.user
  })
}

exports.edit = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('member/edit', {
    user: req.user
  })
}

exports.product = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('member/product', {
    user: req.user
  })
}

exports.transaction = function(req, res, next){
  if(!req.user){
    res.redirect('/');
  }
  res.render('member/transaction', {
    user: req.user
  })
}
