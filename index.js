require('dotenv').config()
const server = require('./api/server')
const path = require('path')
const express = require('express')

//eslint-disable-next-line
const PORT = process.env.PORT || 5000

//eslint-disable-next-line
server.use(express.static(path.join(__dirname, 'client/dist')))

server.listen(PORT, () =>{
    console.log(`\n** Running on port ${PORT} **\n`) 
})
