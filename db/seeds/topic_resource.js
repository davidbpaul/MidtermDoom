exports.seed = function(knex, Promise) {
  return knex('topic_resource').del()
    .then(function () {
      return Promise.all([
        knex('topic_resource').insert({topic_id: "one", resource_id: "one"}),
        knex('topic_resource').insert({topic_id: "two", resource_id: "three"}),
        knex('topic_resource').insert({topic_id: "three", resource_id: "two"}),
      ]);
    });
};
