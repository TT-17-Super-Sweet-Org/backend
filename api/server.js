const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// const restricted = require('./middleware/restricted')

const server = express()
const recipesRouter = require('../api/recipes/recipes-router');
const authRouter = require('../api/auth/auth-router')
const usersRouter = require('../api/users/users-router')

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter);
server.use('/api/users', usersRouter)

server.get('/', (req, res) =>{
    res.status(200).json({message: 'API is up and running'})
})

module.exports = server