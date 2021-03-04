
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl =>{
      tbl.increments()
      tbl.string('username').notNullable().unique()
      tbl.string('password').notNullable()
  })

  .createTable('recipes', tbl =>{
      tbl.increments()
      tbl.string('title', 50).notNullable()
      tbl.string('source', 50).notNullable()
      tbl.string('category', 50).notNullable()
      tbl.string('instructions').notNullable()
      tbl.string('ingredients', 2000).notNullable()
      tbl.string('username').notNullable()
  })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
