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

router.get('/:id', (req,res) => {
    const id = req.params.id
    Recipes.getById(id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/:id')