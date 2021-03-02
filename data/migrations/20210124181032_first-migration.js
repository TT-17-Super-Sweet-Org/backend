
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl =>{
      tbl.increments('user_id')
      tbl.string('username').notNullable().unique()
      tbl.string('password').notNullable()
  })

  .createTable('recipes', tbl =>{
      tbl.increments('recipe_id')
      tbl.string('title', 50).notNullable()
      tbl.string('source', 50).notNullable()
      tbl.string('category', 50).notNullable()
      tbl.string('instructions', 2500).notNullable()
      tbl.string('ingredients', 2500).notNullable()
      tbl.string('username').notNullable()
        .references('username')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
  })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
