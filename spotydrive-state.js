const program = require('commander')
const state = require('./state')

program.parse(process.argv)

const value = program.args[0] ? state.get(program.args[0]).value() : state.getState()

console.log(value)
