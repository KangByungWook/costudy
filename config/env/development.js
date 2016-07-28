module.exports = {
  db: 'mongodb://localhost/costudy',
  sessionSecret:'developmentSessionSecret',
  facebook: {
    clientID: '1138713076168059',
    clientSecret: '701d6abb5d72ca67700f7b656b9319fc',
    callbackURL: 'http://localhost:8080/oauth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'photos']
  }
}
