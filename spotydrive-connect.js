const program = require('commander')

program
  .command('spotify', 'Login to your Spotify Account')
  .command('youtube', 'Login to your Youtube Account')
  .parse(process.argv)
