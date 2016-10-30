'use strict';
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.redirect(`/users/${req.session.user_id}`)
  })

  router.get("/:userid", (req, res) => {
    knex
    .select('resources.id', 'resources.title', 'resources.image','resources.link', 'resources.description', 'users.name')
    .count('likes')
    .avg('ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .leftOuterJoin('likes', 'resources.id', '=', 'likes.resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("resources")
    .groupBy('resources.id', 'resources.title', 'resources.image', 'resources.link', 'resources.description', 'users.name')
    .where("resources.user_id", req.session.user_id)
    .orWhere("likes.user_id", req.session.user_id)
    .then((results) => {
      res.render("index", {
        resources: results,
        user: req.session.user_id,
        title: "My Resources"
      });
    });
  })

   return router;
};
