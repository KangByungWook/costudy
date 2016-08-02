var Product = require('mongoose').model('Product');

exports.index = function(req, res, next) {
  res.render('product/product', {
    title: 'product',
    user: req.user || ''
  });
}

exports.productRead = function(req, res, next) {
  res.render('product/product_detail', {
    product: JSON.parse(req.product),
    user: req.user || ''
  });

}

// exports.productById = function(req, res, next, id) {
//   //id를 통해 찾은 데이터를 req.product에 삽입
//   Product.findOne({
//     _id: id
//   }, function(err, product) {
//     if (err) {
//       return next(err);
//     } else {
//       req.product = product;
//       next();
//     }
//   });
// }

// product CRUD
exports.create = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    var product = new Product(req.body);
    product.set('images', req.files)
    product.leader = req.user.id;

    weekArr = [];
    for(var i = 0 ; i < req.body.weekday.length ; i++){
      weekArr.push({
        day: req.body.weekday[i],
        time: '14:00~16:00'
      })
    }

    // 임시 디폴트값
    product.timeInfo = {
      term: {
        perWeek: req.body.perweek,
        forMonth: req.body.formonth
      },
      week: weekArr
    };
    product.enrolledPeople = [];
    product.locationFeeIncluded = true;
    product.studyType = 'study'
    product.save(function(err) {
      if (err) {
        return next(err);
      } else {
        res.json(product);
      }
    });
  }

};

exports.read = function(req, res) {
  res.json(req.product);
};

exports.list = function(req, res, next) {
  Product.find()
    .populate('leader')
    .populate('enrolledPeople')
    .exec(function(error, products) {
      if (error) {
        return next(error);
      } else {
        res.json(products);
      }
    });
}

exports.productById = function(req, res, next, id) {
  Product.find({
      _id: id
    })
    .populate('leader')
    .populate('enrolledPeople.enrolledBy')
    .exec(function(error, products) {
      if (error) {
        return next(error);
      } else {
        // 배열값으로 주기때문에 [0]을 붙여야댐!!
        req.product = JSON.stringify(products[0]);
        next();
      }
    });
};

exports.update = function(req, res, next) {
  Product.findByIdAndUpdate(req.product.id, req.body, function(err, product) {
    if (err) {
      return next(err);
    } else {
      res.json(product);
    }
  });
};


exports.delete = function(req, res, next) {
  req.product.remove(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(req.product);
    }
  });
}


exports.themeRead = function(req, res, next) {
  //id를 통해 찾은 theme데이터를 req.prouct에 삽입
  res.render('product/theme/theme', {
    data: req.data
  });
}

exports.themeById = function(req, res, next, id) {
  req.data = {
    id: id
  }
  next();
}
