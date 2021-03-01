require('dotenv').config()
const server = require('./api/server')
const path = require('path')

const PORT = process.env.PORT || 5000

server.listen(PORT, () =>{
    console.log(`\n** Running on port ${PORT} **\n`) 
})