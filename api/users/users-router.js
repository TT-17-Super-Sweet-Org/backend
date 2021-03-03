const router = require('express').Router()


const { validateUser, validateUserId } = require('../middleware/auth-middleware')
const { validateRecipe } = require('../middleware/recipes-middleware')
const Users = require('./users-model')
const Recipes = require('../recipes/recipes-model')

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

//get recipes of user
router.get('/:id/recipes', validateUserId, (req,res, next) =>{
    const { id } = req.params
    Users.getUserRecipes(id)
    .then((recipes) =>{
        res.status(200).json(recipes)
    })
    .catch((error) =>{
        next()
    })
})

//adds recipe to user
router.post('/:id/recipes', validateUserId, validateRecipe, (req, res, next) =>{
    const recipeInfo = {...req.body, user_id: req.params.id}

    Recipes.add(recipeInfo)
    .then((recipe) =>{
        res.status(201).json(recipe)
    })
    .catch((error) =>{
        next(error)
    })
})


module.exports = router