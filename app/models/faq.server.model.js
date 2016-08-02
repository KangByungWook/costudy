var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FaqSchema = new Schema({
  // Faq 제목
  title: {
    type: String,
    required: '제목을 입력해주세요'
  },
  // Faq 내용
  content: {
    type: String,
    required: '내용을 입력해주세요'
  },
  // 작성자
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});
FaqSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('Faq', FaqSchema);
