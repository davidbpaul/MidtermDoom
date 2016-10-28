exports.seed = function(knex, Promise) {
  return knex('topic_resource').del()
    .then(function () {
      return Promise.all([
        knex('topic_resource').insert({topic_id: 1, resource_id: 1}),
        knex('topic_resource').insert({topic_id: 2, resource_id: 3}),
        knex('topic_resource').insert({topic_id: 3, resource_id: 2}),
      ]);
    });
};
