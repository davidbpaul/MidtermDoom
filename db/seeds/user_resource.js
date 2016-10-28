exports.seed = function(knex, Promise) {
  return knex('user_resource').del()
    .then(function () {
      return Promise.all([
        knex('user_resource').insert({user_id: "one", resource_id: "two"}),
        knex('user_resource').insert({user_id: "one", resource_id: "three"}),
        knex('user_resource').insert({user_id: "two", resource_id: "one"}),
        knex('user_resource').insert({user_id: "two", resource_id: "three"}),
      ]);
    });
};
