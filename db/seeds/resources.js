exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({id: "one", link:"http://bleacherreport.com", title: 'Sports', description: 'I like sports'}),
        knex('resources').insert({id: "two", link:"http://google.com", title: 'Search', description: 'I like searching things'}),
        knex('resources').insert({id: "three", link:"http://lighthouselabs.ca", title: 'Coding', description: 'I like coding'}),
      ]);
    });
};
