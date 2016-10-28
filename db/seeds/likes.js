exports.seed = function(knex, Promise) {
  return knex('likes').del()
    .then(function () {
      return Promise.all([
        knex('likes').insert({id: "one", user_id: "one", resource_id: "one"}),
        knex('likes').insert({id: "two", user_id: "two", resource_id: "one"}),
        knex('likes').insert({id: "three", user_id: "three", resource_id: "one"}),
      ]);
    });
};
