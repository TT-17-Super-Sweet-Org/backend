const db = require('../../data/dbConfig')

module.exports ={
    get,
    getBy,
    getById,
    add,
    updateUser,
    getUserRecipes
}

function get() {
    return db('users').orderBy('id')
}

function getBy(username){
    return db('users').where('username', username).first()
}

function getById(id) {
    return db('users').where('id', id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')
    return getById(id)
}

function updateUser(changes, id) {
    return db('users').where('id', id).update(changes)
}

function getUserRecipes(userId){
    return db('recipes as r')
    .join('users as u', 'u.id', 'r.user_id')
    .select('u.id', 'r.title')
    .where('r.id', userId)
}