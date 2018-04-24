const program = require('commander')
const opn = require('opn')
const http = require('http')
const request = require('request')
const fs = require('fs')
const util = require('util')
const login = require('./login')

program
  .version('0.1.0')
  .option('-l, --login', 'Login to your Spotify Account')
  .parse(process.argv)

const getPlaylists = token => {
  return request.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }, (error, response, body) => {
    const playlists = JSON.parse(body)
    console.log(playlists.items.map(playlist => playlist.name))
  })
}

program.login && login()