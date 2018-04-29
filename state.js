const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('.spotydrive.json')
const db = low(adapter)

db.defaults({
  spotify: {
    oauth2: {
      clientId: '08ccea97589044b7b339a2d2d4839743',
      clientSecret: 'a698f263d34e427c8f4c14e95bdc9aa3',
      redirectUri: 'http://lvh.me:7777',
      scopes: 'user-read-email playlist-read-private',
      authorizeEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token'
    },
    token: { }
  },
  youtube: {
    oauth2: {
      clientId: '928191779252-kdrfa9pdb61albcnq7fntkdbtj9bbnsg.apps.googleusercontent.com',
      clientSecret: 'evAc19nUWFHpFRtePO_107Hh',
      redirectUri: 'http://localhost:7777',
      scopes: 'https://www.googleapis.com/auth/youtube.readonly',
      authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token'
    },
    token: { }
  }
}).write()

module.exports = db
