const Users = require('../users/users-model')

module.exports = {
    uniqueUsername,
    validateUser
}

function uniqueUsername(req, res, next){
    let { username } = req.body

    let user = Users.getBy(username)
    if(!user){
        next()
    } else{
        res.status(400).json({message: 'Username taken'})
    }
}

function validateUser(req, res, next){
    const { username, password } = req.body

    if(!username || !password){
        res.status(400).json({message: 'Username or password missing'})
    } else{
        next()
    }
}