"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select('name', 'id', 'password')
    .from("users")
    .then((results) => {
      res.json(results);
    });
  })

  // Shows the comments that a user has left on a resource
  router.get("/:userid/comments", (req, res) => {
    knex
    .select('users.name', 'resources.title', 'resources.link', 'comments.comment')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("comments")
    .where("users.id", req.params.userid)
    .then((results) => {
      res.json(results);
    });
  })

  // Shows the links a user has liked
  router.get("/:userid/likes", (req, res) => {
    knex
    .select('resources.id', 'resources.title', 'resources.image','resources.link', 'resources.description')
    .count('likes')
    .avg('ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("likes")
    .groupBy('resources.id', 'resources.title', 'resources.image', 'resources.link', 'resources.description', 'users.name')
    .where("resources.user_id", req.session.user_id)
    .orWhere("likes.user_id", req.session.user_id)
    .then((results) => {
      res.json(results);
    });
  })


  router.get("/:userid/ratings", (req, res) => {
    knex
    .select('users.name', 'resources.link', 'ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("ratings")
    .where("users.id", req.params.userid)
    .then((results) => {
      res.json(results);
    });
  })

  return router;
}
