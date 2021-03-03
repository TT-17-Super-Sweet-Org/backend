const db = require('../../data/dbConfig')

module.exports = {
    getRecipes, 
    getRecipesById,
    add, 
    update,
    remove
}
function getRecipes(username) {
    return db('recipes as r')
    .join('users as u', 'u.username', 'r.username')
    .where("r.username", username)
}

function getRecipesById(username, id) {
    return db('recipes')
    .where({
        recipe_id: id,
        username: username
    })
}

function add(newRecipe) {
    return db('recipes')
    .insert(newRecipe)
    .then(([id])=> {
        return db('recipes')
        .where("recipe_id", id)
        .first()
    })
}

function update(username, id, changes){
    return db('recipes')
    .where({
        username: username,
        id: id
    })
    .update(changes)
    .then(()=> {
        return db('recipes').where('recipes_id', id).first()
    })
}

function remove(id) {
    return db('recipes')
    .where("recipes_id", id)
    .del()
}

