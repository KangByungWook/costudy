var Payment = require('mongoose').model('Payment');

exports.createPayment = function(user_id, product_id, price){
  var payment = new Product({
    product: product_id,
    orderedBy: user_id,
    price: price
  });
  payment.save();
}
