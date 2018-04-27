const program = require('commander')
const request = require('request-promise')
const state = require('./state')

program.parse(process.argv)

const [ playlistUri ] = program.args
const accessToken = state.get('spotify.token.access_token').value()

// spotify:user:spotify:playlist:37i9dQZF1DWTlgzqHpWg4m
const [ , , username, , playlistId ] = playlistUri.split(':')

const options = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}

request(`https://api.spotify.com/v1/users/${username}/playlists/${playlistId}`, options)
  .then(response => JSON.parse(response))
  .then(playlist => ({
    uri: playlist.uri,
    tracks: playlist.tracks.items.map(item => ({
      uri: item.track.uri,
      name: item.track.name,
      artists: item.track.artists.map(artist => artist.name).join(', ')
    }))
  }))
  .then(console.log)
