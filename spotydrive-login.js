const { fork } = require('child_process')
const fs = require('fs')

const runCallbackServer = () => {
  const server = fork(`${__dirname}/callback-server.js`)

  server.on('message', message => {
    persistToken(message)
    server.kill()
    console.log('Logged In!')
  })

  const persistToken = token => fs.writeFileSync(`${__dirname}/.token`, token)
}

const showLoginUrl = () => {
  const {
    clientId,
    redirectUri,
    scopes
  } = JSON.parse(fs.readFileSync(`${__dirname}/.config`))

  const authorizeUri = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri)

  console.log(authorizeUri)
}

showLoginUrl()
runCallbackServer()
