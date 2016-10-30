"use strict";
const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select('resources.id', 'resources.title', 'resources.image','resources.link', 'resources.description', 'users.name')
    .count('likes')
    .avg('ratings.rating')
    .join('users', 'users.id', '=', 'user_id')
    .leftOuterJoin('likes', 'resources.id', '=', 'likes.resource_id')
    .leftOuterJoin('ratings', 'resources.id', '=', 'ratings.resource_id')
    .from("resources")
    .groupBy('resources.id', 'resources.title', 'resources.image', 'resources.link', 'resources.description', 'users.name')
    .then((results) => {
      res.json(results);
    })
  })

  router.get("/:resourceid/comments", (req, res) => {
    knex
    .select('users.name', 'comments.comment')
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

  router.post("/:resourceid/likes", (req, res) => {
    const id = uuid.v4();
    const user_id = req.session.user_id;
    const resource_id = req.params.resourceid;


    knex('likes')
    .select('id')
    .where('user_id', user_id)
    .andWhere('resource_id', resource_id)
    .then((results) => {
      if (!results[0]) {
        knex('likes')
        .insert({
          id: id,
          user_id: user_id,
          resource_id: resource_id
        })
        .return({inserted: true});
      }
    })
  });

   router.post("/:resourceid/comments", (req, res) => {
    const id = uuid.v4();
    const user_id = req.session.user_id;
    const resource_id = req.params.resourceid;
    const comment = req.body.comment_text;
    knex('comments')
    .select('id')
    .where('user_id', user_id)
    .andWhere('resource_id', resource_id)
    .then((results) => {
      if (!results[0]) {
        knex('comments')
        .insert({
          id: id,
          comment: comment,
          user_id: user_id,
          resource_id: resource_id
        })
        .return({inserted: true});
      }
    })
  });


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


  router.post("/:resourceid/ratings", (req, res) => {
    const id = uuid.v4();
    const rating = req.body.rating;
    const user_id = req.session.user_id;
    const resource_id = req.params.resourceid;

    knex('ratings')
    .select('id')
    .where('user_id', user_id)
    .andWhere('resource_id', resource_id)
    .then((results) => {
      if (!results[0]) {
        knex('ratings')
        .insert({
          id: id,
          rating: rating,
          user_id: user_id,
          resource_id: resource_id
        })
        .return({inserted: true});
      }
    })
  });


  return router;
}
