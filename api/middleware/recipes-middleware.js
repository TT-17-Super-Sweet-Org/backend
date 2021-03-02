const Recipes = require('../recipes/recipes-model');

module.exports = {
recipeBody, 
userHasRecipes,
recipeExists
}

const recipeBody = (req, res, next) => {
const { title, source, category, instructions, ingredients, username } = req.body; 
if (!title || ! source || !category || !instructions || !ingredients || !username){
    res.status(400).json({message: "All fields must be filled out :'("})
} else {
    next();
}
}

const userHasRecipes = async (req, res, next) => {
    const username = req.params.username
    const list = await Recipes.getRecipes(username)
    if(list.length = 0){
        res.status(400).json({message: "This user does not have any recipes yet."})
    } else {
        next()
    }
}

const recipeExists = async (req, res, next) => {
    const {username, id} = req.params
    const recipe = await Recipes.getRecipesById(username, id)
    if (!recipe){
        res.status(404).json({message: "Provided recipe_id for this user does not exist."})
    } else{
        next()
    }
}
