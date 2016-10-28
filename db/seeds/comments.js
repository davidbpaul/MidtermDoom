exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({id: "one", comment: "Great for sports", user_id: "one", resource_id: "one"}),
        knex('comments').insert({id: "two", comment: "Great for coding", user_id: "two", resource_id: "three"}),
        knex('comments').insert({id: "three", comment: "Great for searching", user_id: "three", resource_id: "two"}),
      ]);
    });
};
