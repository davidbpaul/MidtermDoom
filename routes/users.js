'use strict';
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select('name')
    .from("users")
    .then((results) => {
      res.json(results);
    });
  })

  router.get("/:userid", (req, res) => {
    knex
    .select('resources.link', 'resources.title', 'resources.description', 'users.name')
    .join('users', 'users.id', '=', 'user_id')
    .join('resources', 'resources.id', '=', 'resource_id')
    .from("user_resource")
    .where("users.id", req.params.userid)
    .then((results) => {
      res.json(results);
    });
  })

   return router;
};
