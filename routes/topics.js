"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select('topics.id', 'resources.image', 'resources.link', 'resources.title', 'resources.description', 'topics.topic')
    .join('topics', 'topics.id', '=', 'topic_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("topic_resource")
    .then((results) => {
      res.render("topics", {
        user: req.session.user_id,
        topics: results
      });
    });
  })

  router.get("/:topicsid", (req, res) => {
    knex
    .select('resources.id', 'resources.link', 'resources.image', 'resources.title', 'resources.description', 'topics.topic')
    .join('topics', 'topics.id', '=', 'topic_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("topic_resource")
    .where("topics.id", req.params.topicsid)
    .then((results) => {
      console.log(results);
      res.render("single_topic", {
        user: req.session.user_id,
        topics: results
      });
    });
  });
  return router;
}
