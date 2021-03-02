const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const recipesRouter = require('../api/recipes/recipes-router');
const authRouter = require('../api/auth/auth-router')

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter);

server.get('/', (req, res) =>{
    res.status(200).json({message: 'API is up and running'})
})

module.exports = server