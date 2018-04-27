const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('.spotydrive.json')
const db = low(adapter)

db.defaults({
  spotify: {
    config: {
      clientId: '08ccea97589044b7b339a2d2d4839743',
      clientSecret: 'a698f263d34e427c8f4c14e95bdc9aa3',
      redirectUri: 'http://lvh.me:7777',
      scopes: 'user-read-email playlist-read-private'
    },
    token: { }
  },
  youtube: {
    config: { }
  }
}).write()

module.exports = db
