exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: "one", name: 'Alice', email: 'alice@alice.com', password: '1'}),
        knex('users').insert({id: "two", name: 'Bob', email: 'bob@bob.com', password: '2'}),
        knex('users').insert({id: "three", name: 'Charlie', email: 'charlie@charlie.com', password: '3'})
      ]);
    });
};
