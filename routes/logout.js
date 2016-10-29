"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt-nodejs');

module.exports = (knex) => {

  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  // returns information
  return router;
}
