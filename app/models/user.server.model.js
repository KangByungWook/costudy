var mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    index: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  fullName: {
    type: String,
    trim: true,
    required: '실명을 입력해주세요'
  },
  contact: {
    type: String,
    trim: true,
    required: '연락처를 입력해주세요'
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
  salt: {
    type: String
  },
  provider:{
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  // website: {
  //   type: String,
  //   get: function(url) {
  //     if (!url) {
  //       return url;
  //     } else {
  //       if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
  //         url = 'http://' + url;
  //       }
  //       return url;
  //     }
  //   }
  // },
  created: {
    type: Date,
    default: Date.now
  }
});

// // 가상 컬럼 생성
// // 모든 도큐먼트에 적용
// UserSchema.virtual('fullName').get(function() {
//   return this.firstName + ' ' + this.lastName;
// }).set(function(fullName){
//   var splitName = fullName.split(' ');
//   this.firstName = splitName[0] || '';
//   this.lastName = splitName[1] || '';
// });

UserSchema.pre('save', function(next){
  if (this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
  var _this  = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username:possibleUsername
  },function(err, user){
    if(!err){
      if(!user){
        callback(possibleUsername);
      } else{
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else{
      callback(null);
    }
  });
};

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
// UserSchema.methods.authenticate = function(password) {
//   return this.password === password;
// }

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('User', UserSchema);
