const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const { query: { code } } = url.parse(req.url, true)

  if (code) {
    res.write(`<script>window.close()</script>`)
    process.send(code)
  }
})

const port = 7777

server.listen(port, err => {
  if (err)
    console.log('Shit happened with the server', err)

  console.log(`Callback server runnning on: ${port}`)
})
