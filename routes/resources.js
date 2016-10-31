"use strict";
const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');

module.exports = (knex) => {

  router.get("/new", (req, res) => {
    res.render('newRef');
  })

  router.post("/new", (req, res) => {
    const resourceId = uuid.v4();
    const topicId = uuid.v4();
    const title = req.body.title;
    const link = req.body.url;
    const image = req.body.image;
    const topic = req.body.topic.toLowerCase();
    const description = req.body.description;
    const user_id = req.session.user_id;

    knex('resources').insert({
      id: resourceId,
      link: link,
      title: title,
      image: image,
      description:description,
      user_id: user_id
    })
    .return({inserted: true})

    knex
    .select("topics.id", "topics.topic")
    .from('topics')
    .where('topics.topic', topic)
    .then((results) => {
      if (!results[0]) {
        knex('topics').insert({
          id: topicId,
          topic: topic
        })
        .return({inserted: true})

        knex('topic_resource').insert({
          topic_id: topicId,
          resource_id: resourceId
        })
        .return({inserted: true})

      } else {
        knex('topic_resource').insert({
          topic_id: results[0].id,
          resource_id: resourceId
        })
        .return({inserted: true})
      }
    })
    res.redirect('/users');
  })

  router.get("/:resourceid", (req, res) => {
    knex
    .select('resources.id', 'resources.title', 'resources.image','resources.link', 'resources.description', 'users.name')
    .avg('ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .leftOuterJoin('likes', 'resources.id', '=', 'likes.resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("resources")
    .where("resources.id", req.params.resourceid)
    .groupBy('resources.id', 'resources.title', 'resources.image', 'resources.link', 'resources.description', 'users.name')
    .then((results) => {
      res.render("oneRef", {
        user: req.session.user_id,
        resource: results[0]})
    });
  })

  return router;
}
