"use strict";
const express = require('express');
const router  = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('register');
  })

  router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password= bcrypt.hashSync(req.body.password);
    const id = uuid.v4();
      knex
      .select('email')
      .from('users')
      .where('email', email)
      .then((results) => {
        if (!results[0]) {
          knex('users')
          .insert({
            id: id,
            name: name,
            email: email,
            password: password
          })
          .return({inserted: true})
          req.session.user_id = id;
          res.redirect('/users')
        } else {
          res.redirect('/register')
        }
      })
    });

  return router;
}
