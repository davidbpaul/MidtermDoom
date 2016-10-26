"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  // IF user is logged in redirect to users resources ELSE show top rated resources
  router.get("/", (req, res) => {
    if(loggedin(req.session.user_id)){
      res.redirect('/resources')
    }else{
      knex
        .select("*")
        .from("resources")
        .then((results) => {
          res.json(results);
        });
    }
  })

  //Shows all resources for a specific user
  router.get("/resources", (req, res) => {
    knex
      .join('users', 'users.id', '=', 'resources.user_id')
      .select('users.name', 'resources.name', 'resources.link')
      .from("resources")
      .then((results) => {
        res.json(results);
      });
  })

  //Shows single resource in users resources
  router.get("/resources/:resourceid", (req, res) => {
    knex
      .join('users', 'users.id', '=', 'resources.user_id')
      .select('users.name', 'resources.name', 'resources.link')
      .from("resources")
      .where("resources.id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  })

  //get all search results
  router.get("/search", (req, res) => {
    knex
      .select("*")
      .from("resources")
      .where("id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  })

  //render registration form
  router.get("/register", (req, res) => {
    res.render('register_form');
  })


  //form for user to input new resource
  router.get("/resources/new", (req, res) => {
    res.render('new_resource')
  })


  // router.post("/resources/new", (req, res) => {
  //   const id =
  //   const name = req.body.
  //   const link = req.body.
  //   const user_id =

  //   knex
  //     knex('resources').insert({id: id, name: name, link: link, user_id: user_id})
  //     .then(function() {
  //       return insert = true;
  //     })
  // })

  //returns information

  return router;
}

//checks if logged in
function loggedin(cookie){
  if (cookie){
    return true
  }
}



