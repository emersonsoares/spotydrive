const program = require('commander')
const rp = require('request-promise')
const { access_token: accessToken } = require('./token')

program.parse(process.argv)

const [ playlistUri ] = program.args

// spotify:user:emersonsoares:playlist:5uSWQi2XtHXmwq8f4aTPAU
const [, , username, , playlistId] = playlistUri.split(':')

const options = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}

rp(`https://api.spotify.com/v1/users/${username}/playlists/${playlistId}`, options)
  .then(response => JSON.parse(response))
  .then(playlist => {
    return playlist.tracks.items.map(item => ({
      name: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', ')
    }))
  })
