const knex = require('knex')
const config = require('../knexfile')    //eslint-disable-next-line
const env = process.env.NODE_ENV || 'development'

module.exports = knex(config[env])