const program = require('commander')
const request = require('request-promise')
const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const path = require('path')
const fs = require('fs-extra')
const Multiprogress = require('multi-progress')

const state = require('./state')
const createSyncState = require('./sync-state')

const homeDir = require('os').homedir()

const syncStatePath = path.join(homeDir, 'spotydrive')

const syncState = createSyncState(syncStatePath)

program.parse(process.argv)

const [ playlistUri ] = program.args

const fetchPlaylist = uri => {
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
      name: playlist.name,
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

const sync = playlist => {
  const { uri, name } = playlist

  const getSyncInfo = () => syncState.get(`sync.${uri}`).value()
  const create = () => {
    syncState.set(`sync.${uri}`, { uri, name, tracks: [] }).write()
    fs.ensureDirSync(path.join(syncStatePath, name))
    return true
  }

  const playlistSync = getSyncInfo() || (create() && getSyncInfo())

  const tasks = playlist.tracks.filter(track => !playlistSync.tracks.some(t => t.uri === track.uri))

  console.log(`Syncing playlist: ${name}`)

  return Promise.all(tasks.map(matchYouTubeVideo))
    .then(tracks => ({ ...playlist, tracks }))
}

const download = matched => {
  const { uri, name, tracks } = matched
  const YD = new YoutubeMp3Downloader({
    outputPath: path.join(syncStatePath, name),
    youtubeVideoQuality: 'highest',
    queueParallelism: 3,
    progressTimeout: 2000
  })

  const multi = Multiprogress(process.stderr)

  const onFinished = {}
  const onProgress = {}

  tracks.map(function (track) {
    const trackDisplay = `${track.name} - ${track.artists.join(', ')}`

    YD.download(track.video.id, `${track.name} - ${track.artists.join(', ')}.mp3`)

    let bar
    onProgress[track.video.id] = progress => {
      if (!bar)
        bar = multi.newBar(`  downloading ${trackDisplay} [:bar] :percent :etas `, {
          total: progress.progress.length,
          curr: progress.progress.percentage,
          complete: '=',
          incomplete: ' ',
          width: 20
        })
      else
        bar.tick(progress.progress.delta)
    }

    onFinished[track.video.id] = (err, data) => {
      if (err) throw console.error()

      syncState.get(`sync.${uri}.tracks`)
        .push(track)
        .write()

      bar.tick(bar.total - bar.curr)
    }
  })

  YD.on('finished', (err, data) => {
    onFinished[data.videoId](err, data)
  })

  YD.on('progress', progress => {
    onProgress[progress.videoId](progress)
  })

  YD.on('error', (err) => {
    console.debug(err)
  })
}

fetchPlaylist(playlistUri)
  .then(sync)
  .then(download)
