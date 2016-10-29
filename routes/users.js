'use strict';
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:userid", (req, res) => {
    knex
    .select('resources.link', 'resources.title', 'resources.description', 'users.name')
    .join('resources', 'users.id', '=', 'user_id')
    .from("users")
    .where("users.id", req.params.userid)
    .then((results) => {
      res.json(results);
    });
  })

   return router;
};
