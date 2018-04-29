const request = require('request-promise')
const state = require('./state')
const util = require('util')
const terminalLink = require('terminal-link')

const oauth2 = (provider) => {
  const {
    clientId,
    clientSecret,
    redirectUri,
    scopes,
    authorizeEndpoint,
    tokenEndpoint
  } = state.get(`${provider}.oauth2`).value()

  const authorize = () => {
    const link = authorizeEndpoint +
      '?response_type=code' +
      '&client_id=' + clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirectUri)
    return terminalLink(`Click here to login on ${provider}`, link)
  }

  const token = code => {
    const basicAuthorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const options = {
      headers: {
        'Authorization': `Basic ${basicAuthorization}`
      },
      form: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        scopes
      },
      method: 'post',
      json: true
    }

    request(tokenEndpoint, options)
      .then(response => {
        state.set(`${provider}.token`, response).write()
      })
      .catch(err => console.log(util.inspect(err)))
  }

  return {
    authorize,
    token
  }
}

module.exports = oauth2
