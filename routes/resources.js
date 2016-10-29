"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/new", (req, res) => {
    res.render('../views/newRef.ejs');
  })

  router.post("/new", (req, res) => {
    const name = req.body.name
    const link = req.body.link
    const user_id = req.seasion.user_id

    knex
      knex('resources').insert({id: id, name: name, link: link, user_id: user_id})
      .then(function() {
        return insert = true;
      })
  })

  router.get("/:resourceid", (req, res) => {
    knex
    .select('resources.link', 'resources.image', 'resources.title', 'resources.description', 'users.name')
    .join('resources', 'users.id', '=', 'user_id')
    .from("users")
    .where("resources.id", req.params.resourceid)
    .then((results) => {
      console.log(results);
      res.render("oneRef", {
        user: req.session.user_id,
        resource: results[0]})
    });
  })

  return router;
}
