exports.seed = function(knex, Promise) {
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        knex('ratings').insert({id: 1, rating: 5, user_id: 3, resource_id: 1}),
        knex('ratings').insert({id: 2, rating: 4, user_id: 2, resource_id: 3}),
        knex('ratings').insert({id: 3, rating: 3, user_id: 1, resource_id: 2}),
      ]);
    });
};
