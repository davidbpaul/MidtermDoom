exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({id: "one", topic: "Sports"}),
        knex('topics').insert({id: "two", topic: "Coding"}),
        knex('topics').insert({id: "three", topic: "Searching"}),
      ]);
    });
};
