var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProductSchema = new Schema({
  // 모임의 리더
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 모임 소개
  introduction: {
    type: String,
    required: '설명을 입력해주세요'
  },
  // 모임 장소
  location: {
    type: String,
    required: '지역을 선택해주세요'
  },
  // 모임 간격 ex)주 2회, 총 3달
  term: {
    detail: {
      perWeek: {
        type: Number
      },
      forMonth: {
        type: Number
      }
    }
  },
  //
  time: {
    weekDay: {
      type: [String]
    },
    time: {
      type: String
    }
  },
  maxPersonNum: {
    type: Number,
    required: '최대 모임 인원을 입력해주세요'
  },
  enrolledPeople: [{
    enrolledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  posts: [{
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  }],
  locationFeeIncluded: {
    type: Boolean,
    required: '장소비 포함 여부를 선택해주세요'
  },
  studyType: {
    type: String,
    enum: ['study', 'lesson'],
    required: '스터디 방식을 선택해주세요'
  },
  created: {
    type: Date,
    default: Date.now
  }
});
ProductSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('Product', ProductSchema);
