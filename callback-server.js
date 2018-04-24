const http = require('http')
const https = require('https')
const url = require('url')
const querystring = require('querystring')
const request = require('request')

const port = 7777

const CLIENT_ID = '08ccea97589044b7b339a2d2d4839743'
const CLIENT_SECRET = 'a698f263d34e427c8f4c14e95bdc9aa3'
const CALLBACK_URL = 'http://lvh.me'
const CALLBACK_PORT = 7777
const REDIRECT_URI = `${CALLBACK_URL}:${CALLBACK_PORT}`

const requestToken = code => {
  const basicAuthorization = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  return request.post({
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${basicAuthorization}`
    },
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }
  }, (err, res, body) => {
    process.send(body)
  })
}

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)
  if(query.code) {
    requestToken(query.code)
    res.write(`
      <script>window.close()</script>
    `)
  }
})

server.listen(port, err => {
  if (err)
    console.log('Shit happened with the server', err)

  console.log(`Callback server runnning on port: ${port}`)
})