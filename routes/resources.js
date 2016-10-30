"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/new", (req, res) => {
    res.render('../views/newRef.ejs');
  })

  router.post("/new", (req, res) => {
    const title = req.body.title
    const link = req.body.url
    const topic = req.body.topic
    const description = req.body.description
    const user_id = req.seasion.user_id

    knex
      knex('resources').insert({
        id: id,
        link: link,
        title: title,
        description:description,
        user_id: user_id
      })
       knex('resources').insert({
        id: id,
        topic:topic
      })
      .then(function() {
        return insert = true;
      })
  })

  router.get("/:resourceid", (req, res) => {
    knex
    .select('resources.id', 'resources.title', 'resources.image','resources.link', 'resources.description', 'users.name')
    .count('likes')
    .avg('ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .leftOuterJoin('likes', 'resources.id', '=', 'likes.resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("resources")
    .where("resources.id", req.params.resourceid)
    .groupBy('resources.id', 'resources.title', 'resources.image', 'resources.link', 'resources.description', 'users.name')
    .then((results) => {
      console.log(results);
      res.render("oneRef", {
        user: req.session.user_id,
        resource: results[0]})
    });
  })

  return router;
}
