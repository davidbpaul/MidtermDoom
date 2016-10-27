exports.seed = function(knex, Promise) {
  return knex('user_resource').del()
    .then(function () {
      return Promise.all([
        knex('user_resource').insert({user_id: 1, resource_id: 2}),
        knex('user_resource').insert({user_id: 1, resource_id: 3}),
        knex('user_resource').insert({user_id: 2, resource_id: 1}),
        knex('user_resource').insert({user_id: 2, resource_id: 3}),
      ]);
    });
};
