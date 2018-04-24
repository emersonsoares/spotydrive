const http = require('http')
const https = require('https')
const url = require('url')
const querystring = require('querystring')
const request = require('request')
const fs = require('fs')

const {
  client_id,
  client_secret,
  redirect_uri,
  scopes
} = require('./config')

const requestToken = code => {
  const basicAuthorization = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  return request.post({
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${basicAuthorization}`
    },
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri
    }
  }, (err, res, body) => {
    process.send(body)
  })
}

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)
  if(query.code) {
    res.write(`
      <script>window.close()</script>
    `)
    requestToken(query.code)
  }
})

const port = url.parse(redirect_uri).port || 3000

server.listen(port, err => {
  if (err)
    console.log('Shit happened with the server', err)

  console.log(`Callback server runnning on: ${port}`)
})