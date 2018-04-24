const fs = require('fs')

let token
try {
  token = JSON.parse(fs.readFileSync(`${__dirname}/.token`))
} catch (error) {
  token = {}
}

module.exports = token