const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs-extra')

module.exports = dest => {
  const metadataPath = path.join(dest, '.spotydrive.json')
  console.log(metadataPath)
  
  fs.ensureFileSync(metadataPath)

  const adapter = new FileSync(path.join(dest, '.spotydrive.json'))
  const db = low(adapter)

  db.defaults({
    sync: {},
    lastSync: null
  }).write()

  return db
}
