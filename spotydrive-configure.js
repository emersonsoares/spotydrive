const program = require('commander')
const fs = require('fs')
const current = require('./config')

program
  .option('-c, --client_id [client_id]', 'client_id')
  .option('-s, --client_secret [client_secret]', 'client_secret')
  .option('-r, --redirect_uri [redirect_uri]', 'redirect_uri')
  .option('-s, --scopes [scopes]', 'scopes')
  .parse(process.argv)

const config = {
  clientId: program.client_id || current.clientId || '',
  clientSecret: program.client_secret || current.clientSecret || '',
  redirectUri: program.redirect_uri || current.redirectUri || 'http://lvh.me:7777',
  scopes: program.scopes || current.scopes || 'user-read-email playlist-read-private'
}

fs.writeFileSync(`${__dirname}/.config`, JSON.stringify(config))

console.log('Spotydrive client configured sucessfully')
