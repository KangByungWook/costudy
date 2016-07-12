var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    // 주 색인
    // unique: true,
    required: true
  },
  website: {
    type: String,
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: [function(password) {
        return password.length >= 6;
      },
      'Password should be longer' // 조건에 맞지 않을 시 해당 메시지를 콜백으로 전달
    ]
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// 맞춤식 정적(모델 자체에 사용) 메소드
// User.findOneByUsername('username', function(err,user){
//  ...
//})
//이런식으로 사용
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({
    username: new RegExp(username, 'i')
  }, callback);
}


// 맞춤식 인스턴스(각 도큐먼트에 사용) 메소드
// user.authenticate('password')
// 이런식으로 사용
UserSchema.methods.authenticate = function(password) {
  return this.password === password;
}

UserSchema.post('save', function(next){
  if (this.isNew){
    console.log('A new user was created');
  }
  else{
    console.log('A user updated is details');
  }
})

// 가상 컬럼 생성
// 모든 도큐먼트에 적용
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
})

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('User', UserSchema);
