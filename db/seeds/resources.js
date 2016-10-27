exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({id: 1, link:"http://bleacherreport.com", title: 'Sports', description: 'I like sports'}),
        knex('resources').insert({id: 2, link:"http://google.com", title: 'Search', description: 'I like searching things'}),
        knex('resources').insert({id: 3, link:"http://lighthouselabs.ca", title: 'Coding', description: 'I like coding'}),
      ]);
    });
};
