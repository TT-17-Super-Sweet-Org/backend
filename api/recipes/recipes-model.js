const db = require('../../data/dbConfig')

module.exports = {
    getRecipes, 
    add, 
    update,
    remove
}
function getRecipes(username) {
    return db('recipes')
    .where("username", username)
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

function update(changes, id){
    return db('recipes')
    .where("recipe_id", id)
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

