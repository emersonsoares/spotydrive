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
  const {
    client_id,
    client_secret,
    redirect_uri,
    scopes
  } = JSON.parse(fs.readFileSync(`${__dirname}/.config`))

  const authorizeUri = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)

  console.log(authorizeUri)
}

showLoginUrl()
runCallbackServer()