const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

/*
Routers
Routers
*/

server.get('/', (req, res) =>{
    res.status(200).json({message: 'API is up and running'})
})