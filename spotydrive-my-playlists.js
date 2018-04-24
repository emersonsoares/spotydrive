const program = require('commander')
const request = require('request')
const rp = require('request-promise')

const { access_token } = require('./token')

const options = {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
}

rp('https://api.spotify.com/v1/me/playlists', options)
  .then(response => JSON.parse(response))
  .then(playlists => {
    console.log(playlists.items.map(playlist => playlist.name))
  })
