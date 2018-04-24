const fs = require('fs')

let config
try {
  config = JSON.parse(fs.readFileSync(`${__dirname}/.config`))
} catch (error) {
  config = {}
}

module.exports = config