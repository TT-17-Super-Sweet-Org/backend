const Users = require('../users/users-model')

module.exports = {
    uniqueUsername,
    validateUser,
    validateUserId
}

async function uniqueUsername(req, res, next){
    const { username } = req.body
    const user = await Users.getBy(username)
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


async function validateUserId(req, res, next){
    const { id } = req.params
    const user = await Users.getById(id)

    if(!user){
        res.status(400).json({message: 'User not found'})
    } else{
        next()
    }
}