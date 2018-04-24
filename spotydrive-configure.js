const program = require('commander')
const fs = require('fs')

program.parse(process.argv)

const [ client_id, client_secret, redirect_uri = 'http://lvh.me:7777' ] = program.args
const scopes = 'user-read-email playlist-read-private'

const config = {
  client_id,
  client_secret,
  redirect_uri,
  scopes
}

fs.writeFileSync(`${__dirname}/.config`, JSON.stringify(config))

console.log('Spotydrive client configured sucessfully')