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

//get recipe by id
router.get('/:id', validateRecipeId, (req,res, next) => {
    res.status(200).json(req.recipe)
})


// fix/debug
router.post('/', recipeBody, (req,res, next) => {
    Recipes.add(req.body)
    .then(recipe => {
        res.status(201).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

//  fix/debug
router.get('/:username/:id', recipeExists, (req,res, next) => {
    const username = req.body.username;
    const { id } = req.params;

    console.log(id)
    Recipes.getRecipesById(username, id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

// fix/debug
router.put('/:username/:id', recipeExists, recipeBody, (req,res, next) => {
    const username = req.body.username;
    const { id } = req.params;
    const changes = req.body;
    Recipes.update(username, id, changes)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(error => {
        next(error)
    })
})

router.use((error, req, res, next) =>{
    res.status(500).json({
        info: 'An error occured inside the recipesRouter',
        message: error.message,
        stack: error.stack,
    })
})

module.exports = router;