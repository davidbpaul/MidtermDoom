"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select('topics.id', 'topics.topic')
    .from("topics")
    .then((results) => {
      res.render("topics", {
        user: req.session.user_id,
        topics: results
      });
    });
  })

  router.get("/:topicsid", (req, res) => {
    knex
    .select('resources.id', 'resources.link', 'resources.image', 'resources.title', 'resources.description', 'topics.topic', 'users.name')
    .count('likes')
    .avg('ratings.rating')
    .join('topics', 'topics.id', '=', 'topic_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .join('users', 'users.id', '=', 'resources.user_id')
    .leftOuterJoin('likes', 'resources.id', '=', 'likes.resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("topic_resource")
    .where("topics.id", req.params.topicsid)
    .groupBy('resources.id', 'resources.link', 'resources.image', 'resources.title', 'resources.description', 'topics.topic', 'users.name')
    .then((results) => {
      res.render("single_topic", {
        user: req.session.user_id,
        topics: results
      });
    });
  });
  return router;
}
