"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt-nodejs');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    knex
    .select('id', 'email', 'password')
    .from("users")
    .where("email", req.body.email)
    .then((results) => {
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        req.session.user_id = results[0].id;
        res.redirect("/users");
      } else {
        res.send("Incorrect username or password")
      };
    });
  });
  // returns information
  return router;
}
