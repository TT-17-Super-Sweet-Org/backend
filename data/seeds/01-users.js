
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Miguel', password: 'password123'},
        {username: 'Jennifer', password: 'abc123'},
        {username: 'Victoria', password: 'secret123'}
      ]);
    });
};
