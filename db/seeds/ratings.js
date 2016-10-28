exports.seed = function(knex, Promise) {
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        knex('ratings').insert({id: "one", rating: 5, user_id: "three", resource_id: "one"}),
        knex('ratings').insert({id: "two", rating: 4, user_id: "two", resource_id: "three"}),
        knex('ratings').insert({id: "three", rating: 3, user_id: "one", resource_id: "two"}),
      ]);
    });
};
