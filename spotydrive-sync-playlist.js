const program = require('commander')
const request = require('request-promise')
const state = require('./state')
const util = require('util')

program.parse(process.argv)

const [ playlistUri ] = program.args

const loadPlaylist = uri => {
  const accessToken = state.get('spotify.token.access_token').value()

  // spotify:user:spotify:playlist:37i9dQZF1DWTlgzqHpWg4m
  const [ , , username, , playlistId ] = playlistUri.split(':')

  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }

  return request(`https://api.spotify.com/v1/users/${username}/playlists/${playlistId}`, options)
    .then(response => JSON.parse(response))
    .then(playlist => ({
      uri: playlist.uri,
      tracks: playlist.tracks.items.map(item => ({
        uri: item.track.uri,
        name: item.track.name,
        artists: item.track.artists.map(artist => artist.name)
      }))
    }))
}

const matchYouTubeVideo = track => {
  const accessToken = state.get('youtube.token.access_token').value()
  const { name, artists } = track

  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    qs: {
      q: `${name} - ${artists.join(', ')}`,
      part: 'snippet',
      maxResults: 1,
      order: 'relevance',
      type: 'video'
    }
  }

  return request('https://www.googleapis.com/youtube/v3/search', options)
    .then(response => JSON.parse(response))
    .then(response => response.items[0])
    .then(video => ({
      ...track,
      video: {
        id: video.id.videoId,
        title: video.snippet.title
      }
    }))
}

const download = matched => {
  matched.tracks.map(track => {
    console.log(`Downloading ${track.name} - ${track.artists.join(', ')} => ${track.video.id}`)
  })
}

loadPlaylist(playlistUri)
  .then(playlist => {
    const futureTracks = playlist.tracks.map(matchYouTubeVideo)
    return Promise.all(futureTracks)
      .then(tracks => ({ ...playlist, tracks }))
  })
  .then(download)
  .catch(console.log)
