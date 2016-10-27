"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select('resources.title', 'resources.link', 'resources.description', 'users.name')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("user_resource")
    .then((results) => {
      res.json(results);
    });
  })

  router.get("/:resourceid/comments", (req, res) => {
    knex
    .select('users.name', 'resources.link', 'comments.comment')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("comments")
    .where("resources.id", req.params.resourceid)
    .then((results) => {
      res.json(results);
    });
  })

  router.get("/:resourceid/likes", (req, res) => {
    knex
    .select('resources.link', 'users.name', 'likes.id')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("likes")
    .where("resources.id", req.params.resourceid)
    .then((results) => {
      res.json(results);
    });
  })

  router.get("/:resourceid/ratings", (req, res) => {
    knex
    .select('resources.link', 'users.name', 'ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("ratings")
    .where("resources.id", req.params.resourceid)
    .then((results) => {
      res.json(results);
    });
  })

  return router;
}
