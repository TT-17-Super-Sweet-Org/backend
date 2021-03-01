const db = require('../../data/dbConfig')

module.exports ={
    get,
    getBy,
    getById,
    insertUser,
    updateUser,
}

function get() {
    return db('users').orderBy('user_id')
}

function getBy(username){
    return db('users').where('username', username).first()
}

function getById(id) {
    return db('users').where('user_id', id).first()
}

async function insertUser(user) {
    const [id] = await db('users').insert(user, 'user_id')
    return getById(id)
}

function updateUser(changes, id) {
    return db('users').where('user_id', id).update(changes)
}