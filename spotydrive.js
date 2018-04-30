#!/usr/bin/env node
const program = require('commander')

program
  .version('0.1.4')
  .command('configure', 'Configure your Spotydrive copy').alias('c')
  .command('connect', 'connect spotydrive to your social accounts').alias('con')
  .command('sync-playlist <playlist_uri>', 'sync playlist to storage').alias('sp')
  .command('state [path]', 'show current state')
  .parse(process.argv)
