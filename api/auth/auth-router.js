const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secret')
const { isValid } = require('../users/users-service')

router.post('/register', (req,res) =>{
    const credentials = req.body

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 10
        const hash = bcrypt.hashSync(req.body.password, rounds)

        credentials.password = hash

        User.insertUser(credentials)
        .then((user) =>{
            res.status(201).json(user)
        })
        .catch((error) =>{
            res.status(400).json({message: 'Username taken'})
        })
    } else{
        res.status(400).json({message: 'Username ans password required'})
    }
})

router.post('/login', (req, res) =>{
    const { username, password } = req.body

    if(isValid(req.body)){
        User.getBy({username: username })
        .then(([user]) =>{
            if(user && bcrypt.compareSync(password, user.password)){
                const token = makeToken(user)

                res.status(200).json({message: `Welcome ${user.username}`, token})
            } else{
                res.status(400).json({message: 'Invalid Credentials'})
            }
        })
        .catch((error) =>{
            res.status(500).json({message: error.message})
        })
    } else{
        res.status(400).json({message: 'Username and password required'})
    }
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