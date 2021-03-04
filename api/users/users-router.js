const router = require('express').Router()


const { validateUser, validateUserId } = require('../middleware/auth-middleware')
const Users = require('./users-model')

//get all users
router.get('/', (req, res, next) =>{
    Users.get()
    .then((users) =>{
        res.status(200).json(users)
    })
    .catch((error) =>{
        next(error)
    })
})


//get user by id
router.get('/:id', validateUserId, (req, res, next) =>{
    const { id } = req.params

    Users.getById(id)
    .then((user) =>{
       res.status(200).json(user) 
    })
    .catch((error) =>{
        next(error)
    })
})

//update specified user
router.put('/:id', validateUser, validateUserId, (req, res, next) =>{
    const { id } = req.params
    const changes = req.body
    Users.updateUser(changes, id)
    .then((user) =>{
       res.status(200).json(user) 
    })
    .catch((error) =>{
        next(error)
    })
})

module.exports = router