const db = require('../../data/dbConfig')

module.exports = {
    get,
    getRecipesById,
    getRecipesByUser,
    add, 
    update,
    remove
}

function get(){ 
    return db('recipes')
}

function getRecipesById(username, id) {
    return db('recipes')
    .where({
        id: id,
        username: username
    })
}

function getRecipesByUser(username) {
    return db('recipes')
    .where("username", username)
}

function add(recipe) {
return db('recipes').insert(recipe, ["title", "source", "username", "category", "ingredients", "instructions", "id"])
}

function update(username, id, changes){
    return db('recipes')
    .where({
        username: username,
        id: id
    })
    .update(changes)
    .then(()=> {
        return db('recipes').where('id', id).first()
    })
}

function remove(username, id) {
    return db('recipes')
    .where({
        id: id,
        username: username
    })
    .del()
}

