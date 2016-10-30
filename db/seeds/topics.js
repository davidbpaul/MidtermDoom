exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({id: "one", topic: "sports"}),
        knex('topics').insert({id: "two", topic: "coding"}),
        knex('topics').insert({id: "three", topic: "searching"}),
      ]);
    });
};
