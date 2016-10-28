exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({id: 1, topic: "Sports"}),
        knex('topics').insert({id: 2, topic: "Coding"}),
        knex('topics').insert({id: 3, topic: "Searching"}),
      ]);
    });
};
