require('dotenv').config({path: './.env'})
const pg = require('pg')


//eslint-disable-next-line
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,   //eslint-disable-next-line
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,   //eslint-disable-next-line
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,   //eslint-disable-next-line
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
}