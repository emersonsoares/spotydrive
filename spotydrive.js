const program = require('commander')

program
  .version('0.1.0')
  .command('configure', 'Configure your Spotydrive copy').alias('c')
  .command('login', 'Login to your Spotify Account').alias('l')
  .parse(process.argv)