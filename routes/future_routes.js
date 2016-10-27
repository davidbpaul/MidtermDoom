// FILE WITH FUTURE ROUTES NOT FOR USE
"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // to be used in ajax
  router.get("/search", (req, res) => {
    knex
    .select("*")
    .from("resources")
    .then((results) => {
      const output = [];
      for (let result of results) {
        if (result.title.includes('Coding')) {
          output.push(result);
        }
      }
      res.send(output);
    });
  })
  // returns information
  return router;
}
