const express = require('express'); 
const Recipes = require('./recipes-model'); 
const mw = require('../middleware/recipes-middleware');

const router = express.Router(); 

router.get('/:username', (req,res) => {
    const username = req.params.username;
    Recipes.getRecipes(username)
    .then(recipes => {
        res.status(200).json(recipes);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', (req,res) => {
    Recipes.getById(req.body)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:username/:id', (req,res) => {
    const username = req.params.username;
    const id = req.params.id;
    Recipes.getRecipesById(username, id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.put('/:username/:id', (req,res) => {
    const username = req.params.username;
    const id = req.params.id;
    const changes = req.body;
    Recipes.update(username, id, changes)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})