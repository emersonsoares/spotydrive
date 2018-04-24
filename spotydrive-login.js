const { fork } = require('child_process')
const fs = require('fs')

const runCallbackServer = () => {
  const server = fork(`${__dirname}/callback-server.js`)

  const persistToken = token => fs.writeFileSync(`${__dirname}/.token`, token)

  server.on('message', message => {
    persistToken(message)
    console.log('Logged In!')
    server.kill()
  })
}

const showLoginUrl = () => {
  const CLIENT_ID = '08ccea97589044b7b339a2d2d4839743'
  const CLIENT_SECRET = 'a698f263d34e427c8f4c14e95bdc9aa3'
  const CALLBACK_URL = 'http://lvh.me'
  const CALLBACK_PORT = 7777
  const REDIRECT_URI = `${CALLBACK_URL}:${CALLBACK_PORT}`

  const scopes = 'user-read-email playlist-read-private'

  const authorizeUri = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)

  console.log(authorizeUri)
}

showLoginUrl()
runCallbackServer()