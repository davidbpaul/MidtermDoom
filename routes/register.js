"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  
  router.get("/", (req, res) => {
    res.render('register_form');
  })

  router.post("/", (req, res) => {
    //get information from user
    const name = req.body.name
    const email = req.body.email
    const hashed_password = bcrypt.hashSync(req.body.password)
      //checks if email already belongs to someone
      knex
      .select('email').from('users')
      .where('email', email)
      .asCallback(function(err, rows) {
        if(rows.length = 1){
          res.status(400);
          res.send('email taken');
        };
      });

      //checks if user filled out form
      // if (email === '' || name === '' bcrypt.compareSync('', hashed_password)) {
      //   res.status(400);
      //   res.send('missing information');
      // } else {
      //   knex
      //   .insert({name: name, email: email, password: hashed_password}).into('users')
      //   .then(function() {
      //     return insert = true;
      //   })
        res.redirect('/')
      // };
  })
  return router;
}
