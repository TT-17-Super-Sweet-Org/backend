const Recipes = require('../recipes/recipes-model');

module.exports = {
recipeBody, 
userHasRecipes,
recipeExists
}

// function recipeBody (req, res, next){
// const { title, source, category, instructions, ingredients, username } = req.body; 
// if (!title || ! source || !category || !instructions || !ingredients || !username){
//     res.status(400).json({message: "All fields must be filled out :'("})
// } else {
//     next();
// }
// }

async function userHasRecipes(req, res, next){
    const {username} = req.params;
    const list = await Recipes.getRecipesByUser(username)
    if(list.length === 0){
        res.status(404).json({message: "This user does not have any recipes yet."})
    } else {
        next()
    }
}

async function recipeExists (req, res, next){
    const { username } = req.params
    const { id } = req.params
    const recipe = await Recipes.getRecipesById(username, id)
    if (recipe.length === 0){
        res.status(404).json({message: "Provided recipe_id for this user does not exist."})
    } else{
        next()
    }
}
