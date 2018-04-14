const program = require('commander')

program
  .version('0.1.0')
  .option('-l, --login', 'Login to your Spotify Account')
  .parse(process.argv)

console.log(`Lets login to your spotify account: ${program.login}`)