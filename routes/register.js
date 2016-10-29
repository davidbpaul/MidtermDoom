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
    //get information from user
    const name = req.body.name;
    const email = req.body.email;
    const password= bcrypt.hashSync(req.body.password);
      //checks if email already belongs to someone
      knex
      .select('email')
      .from('users')
      .where('email', email)
      .then((results) => {
        if (!results[0]) {
          knex('users')
          .insert({
            id: uuid.v4(),
            name: name,
            email: email,
            password: password
          })
          .return({inserted: true});

        } else {
          console.log(`${email} already taken`);
        }
      })
      res.end();
    });

  return router;
}
