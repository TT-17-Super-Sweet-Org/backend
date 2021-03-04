const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secret')
const { uniqueUsername, validateUser } = require('../middleware/auth-middleware')

router.post('/register', uniqueUsername, validateUser, (req, res) =>{
    const user = req.body     //eslint-disable-next-line
    const rounds = process.env.BCRYPT_ROUNDS || 10   
    const hash = bcrypt.hashSync(req.body.password, rounds)

    user.password = hash

    Users.add(user)
    .then((addUser) =>{
        res.status(201).json(addUser)
    })
    .catch((error) =>{
        next(error)
    })
})

router.post('/login', validateUser, async (req, res) =>{
    const { username, password } = req.body
    const user = await Users.getBy(username)

    if(user && bcrypt.compareSync(password, user.password)){
        const token = makeToken(user)
        res.status(200).json({message: `Welcome to our API ${user.username}`, user: user.username, user, token})
    } else{
        res.status(401).json({message: 'Invalid credentials'})
    }
})

router.use((error, req, res, next) =>{
    res.status(500).json({
        info: 'An error occured inside the authRouter',
        message: error.message,
        stack: error.stack,
    })
})

function makeToken(user){
    const payload ={
        subject: user.user_id,
        username: user.username,
    }
    const options ={
        expiresIn: '2h'
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router