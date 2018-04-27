const program = require('commander')

program
  .version('0.1.0')
  .command('configure', 'Configure your Spotydrive copy').alias('c')
  .command('login', 'Login to your Spotify Account').alias('l')
  .command('my-playlists', 'show all my playlists').alias('mp')
  .command('sync-playlist <playlist_uri>', 'sync playlist to storage').alias('sp')
  .command('state [path]', 'show current state')
  .parse(process.argv)
