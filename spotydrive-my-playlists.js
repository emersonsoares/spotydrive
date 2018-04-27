const rp = require('request-promise')

const { access_token: accessToken } = require('./token')

const options = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}

rp('https://api.spotify.com/v1/me/playlists', options)
  .then(response => JSON.parse(response))
  .then(playlists => {
    console.log(playlists.items.map(playlist => playlist.name))
  })
