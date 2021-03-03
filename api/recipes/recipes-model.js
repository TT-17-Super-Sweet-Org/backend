const db = require('../../data/dbConfig')

module.exports = {
    get,
    getById, 
    getRecipesById,
    add, 
    update,
    remove
}

function get(){
    return db('recipes')
}

function getById(id) {
    return db('recipes').where({id}).first()
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
    .then(ids => {
        return getById(ids[0]);
      });
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

