const express = require('express'); 
const Recipes = require('./recipes-model'); 
const { recipeBody, userHasRecipes, recipeExists, validateRecipeId} = require('../middleware/recipes-middleware');

const router = express.Router(); 

//gets all recipes
router.get('/', (req, res, next) =>{
    Recipes.get()
    .then((recipes) =>{
        res.status(200).json(recipes)
    })
    .catch((error) =>{
        next()
    })
})

//get recipes created by username
router.get('/:username', userHasRecipes, (req,res, next) => {
const {username} = req.params; 
Recipes.getRecipesByUser(username)
.then(recipes => {
    res.status(200).json(recipes)
})
.catch(error => {
    next(error)
})
})

//creates new recipe, does not have pretty response
router.post('/', recipeBody, (req,res, next) => {
    Recipes.add(req.body)
    .then(recipe => {
        res.status(201).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

//gets recipe created by user at the recipe id
router.get('/:username/:id', recipeExists, (req,res, next) => {
    const { id } = req.params;
    const { username } = req.params;
    Recipes.getRecipesById(username, id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

// updates recipe for username and their recipe id
router.put('/:username/:id', recipeExists, recipeBody, (req,res, next) => {
    const username = req.params.username;
    const id = req.params.id;
    const changes = req.body;
    Recipes.update(username, id, changes)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

//deletes recipes for user at recipe's id
router.delete('/:username/:id', recipeExists, (req,res, next) => {
    const {username} = req.params;
    const {id} = req.params;
    Recipes.remove(username, id)
    .then(()=>{
        res.status(200).json({message:"recipe deleted"});
    })
    .catch(error => {
        next(error)
    })
})

router.use((error, req, res, next) =>{
    res.status(500).json({
        info: 'An error occured inside the recipesRouter',
        message: error.message,
        detail: error.detail,
        stack: error.stack,
    })
})

module.exports = router;