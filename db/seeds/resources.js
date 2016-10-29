exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({id: "one", link:"http://bleacherreport.com", image: 'https://pbs.twimg.com/profile_images/791059560308043776/c4BSc8zg.jpg', title: 'Sports', description: 'I like sports', user_id: 'two'}),
        knex('resources').insert({id: "two", link:"http://google.com", image: 'https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg', title: 'Search', description: 'I like searching things', user_id: 'three'}),
        knex('resources').insert({id: "three", link:"http://lighthouselabs.ca", image: 'http://www.lighthouselabs.ca/static-assets/lighthouse-labs.png', title: 'Coding', description: 'I like coding', user_id: 'one'}),
        knex('resources').insert({id: "four", link:"http://lighthouselabs.ca", image: 'http://www.lighthouselabs.ca/static-assets/lighthouse-labs.png', title: 'Coding', description: 'I like coding', user_id: 'three'})
      ]);
    });
};
