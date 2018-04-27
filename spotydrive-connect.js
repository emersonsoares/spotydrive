const program = require('commander')
const { fork } = require('child_process')

program
  .option('-p, --provider <provider>', 'Select social idp to connect')
  .parse(process.argv)

const oauth2 = require('./oauth2')(program.provider)
console.log(oauth2.authorize())

const child = fork('./callback-server')
child.on('message', message => {
  oauth2.token(message)
  console.log('Login successful')
  child.kill()
})
