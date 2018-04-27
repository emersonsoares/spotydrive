const { fork } = require('child_process')
const state = require('./state')

const runCallbackServer = () => {
  const server = fork(`${__dirname}/callback-server.js`)

  server.on('message', message => {
    state.set('spotify.token', JSON.parse(message)).write()
    server.kill()
    console.log('Logged In!')
  })
}

const showLoginUrl = () => {
  const {
    clientId,
    redirectUri,
    scopes
  } = state.get('spotify.config').value()

  const authorizeUri = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri)

  console.log(authorizeUri)
}

showLoginUrl()
runCallbackServer()
