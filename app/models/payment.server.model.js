var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  orderedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price:{
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  }
})
mongoose.model('Payment', PaymentSchema);
