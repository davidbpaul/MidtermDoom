// "use strict";

const express = require('express');
// // const app = express();
// // app.set("view engine", "ejs");

// // //lets us to get information from post
// // const bodyParser = require("body-parser");
// // app.use(bodyParser.urlencoded({extended:false}));
// // //allow us to use put and delete
// // const methodOverride = require('method-override')
// // app.use(methodOverride('_method'));

// // //allows for cookies
// // const cookieParser = require('cookie-parser')
// // app.use(cookieParser())

// // //security
// // const bcrypt = require('bcrypt-nodejs');
// // //cookie security
// // const cookieSession = require('cookie-session')
// // app.use(cookieSession({
// //  keys: ['user_id']
// // }))
const router  = express.Router();

module.exports = (knex) => {



  //Shows single resource in users resources
  router.get("/resources/:resourceid", (req, res) => {
    knex
      .join('users', 'users.id', '=', 'user_id')
      .join('resources', 'resources.id', '=', 'resource_id')
      .select('resources.link', 'resources.name', 'resources.description', 'users.name')
      .from("user_resource")
      .where("resources.id", req.params.resourceid)
      .then((results) => {
        res.json(results);
      });
  })

  //get all topic resources
  router.get("/topics", (req, res) => {
    knex
      .join('topics', 'topic.id', '=', 'topic_id')
      .join('resources', 'resources.id', '=', 'resource_id')
      .select('resources.link', 'resources.name', 'resources.description', 'topic.name')
      .from("topic_resource")
      .then((results) => {
        res.json(results);
      });
  })

//   //get specific topic resource
//   router.get("/topics/:topicsid", (req, res) => {
//     knex
//       .join('topics', 'topic.id', '=', 'topic_id')
//       .join('resources', 'resources.id', '=', 'resource_id')
//       .select('resources.link', 'resources.name', 'resources.description', 'topic.name')
//       .from("topic_resource")
//       .where("topics.id", req.params.topicsid)
//       .then((results) => {
//         res.json(results);
//       });
//   })

//   //get all search results
//   router.get("/search", (req, res) => {
//     knex
//       .select("*")
//       .from("resources")
//       .where("id", req.body.search)
//       .then((results) => {
//         res.json(results);
//       });
//   })

//   //render registration form
//   router.get("/register", (req, res) => {
//     res.render('register_form');
//   })

//   //registers user
//   router.post("/register", (req, res) => {
//     //get information from user
//     const name = rew.body.name
//     const email = req.body.email
//     const hashed_password = bcrypt.hashSync(req.body.password)
//       //checks if email already belongs to someone
//       knex
//         .select('email').from('users')
//         .where('email', email)
//         .asCallback(function(err, rows) {
//           if(rows.length = 1){
//             res.status(400);
//             res.send('email taken');
//           };
//         });
//       //checks if user filled out form
//       if(email === '' || name === '' bcrypt.compareSync('', hashed_password)){
//         res.status(400);
//         res.send('missing information');
//       }else{
//         knex
//           .insert({name: name, email: email, password: hashed_password}).into('users')
//           .then(function() {
//             return insert = true;
//           })
//         res.redirect('/')
//       };
//   })
//   //form for user to input new resource
//   router.get("/resources/new", (req, res) => {
//     res.render('new_resource')
//   })

//   // post new resource
//   router.post("/resources/new", (req, res) => {
//     const name = req.body.name
//     const link = req.body.link
//     const user_id = req.body.

//     knex
//       knex('resources').insert({id: id, name: name, link: link, user_id: user_id})
//       .then(function() {
//         return insert = true;
//       })
//   })

//   //get comments for specific resource
//   router.get("/resources/:resourceid/comments", (req, res) => {

//     knex
//       .join('users', 'user.id', '=', 'user_id')
//       .join('resources', 'resources.id', '=', 'resource_id')
//       .select('comments.comment', 'comments.user_id')
//       .from("comments")
//       .where("resources.id", req.params.resourceid)
//       .then((results) => {
//         res.json(results);
//       });
//   })

  router.get("/users", (req, res) => {
    res.redirect('/resources')
  })

  // returns information
  return router;
}

// //checks if logged in
// function loggedin(cookie){
//   if (cookie){
//     return true
//   }
// }



