exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({id: 1, comment: "Great for sports", user_id: 1, resource_id: 1}),
        knex('comments').insert({id: 2, comment: "Great for coding", user_id: 2, resource_id: 3}),
        knex('comments').insert({id: 3, comment: "Great for searching", user_id: 3, resource_id: 2}),
      ]);
    });
};
