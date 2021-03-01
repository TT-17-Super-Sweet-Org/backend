
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl =>{
      tbl.increments('user_id')
      tbl.string('username').notNullable().unique()
      tbl.string('password').notNullable()
  })
  .createTable('categories', tbl =>{
      tbl.increments('category_id')
      tbl.string('category').notNullable()
  })
  .createTable('ingredients', tbl =>{
      tbl.increments('ingredient_id')
      tbl.string('ingredient').notNullable()
  })
  .createTable('recipes', tbl =>{
      tbl.increments('recipe_id')
      tbl.string('title').notNullable()
      tbl.string('source').notNullable()
      tbl.integer('category_id')
        .references('category_id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('user_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })
  .createTable('steps', tbl =>{
      tbl.increments('steps_id')
      tbl.string('instructions').notNullable()
      tbl.integer('recipe_id')
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('Cascade')
        .onUpdate('Cascade')
  })
  .createTable('steps_ingredients', tbl =>{
      tbl.increments('step_ingredient_id')
      tbl.integer('ingredient_id')
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.string('quantity').notNullable()
      tbl.integer('steps_id')
        .references('steps_id')
        .inTable('steps')
        .onDelete('CASCADE')
        .onUpdate('Cascade')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('steps_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
};
