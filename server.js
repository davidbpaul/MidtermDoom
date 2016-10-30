"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const resourcesApiRoutes = require("./routes/api_resources");
const usersApiRoutes = require("./routes/api_users");
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");
const topicsRoutes = require("./routes/topics")
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login")
const logoutRoutes = require("./routes/logout")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Home page
app.get("/", (req, res) => {
  if (req.session.user_id) {
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
      res.render("index", {
        resources: results,
        user: req.session.user_id,
        title: "All"
      });
    });
  } else {
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
      res.render("index", {
        resources: results,
        user: false,
        title: "All"
      });
    });
  }
});

// Mount all resource routes
app.use("/api/resources", resourcesApiRoutes(knex));
app.use("/api/users", usersApiRoutes(knex));
app.use("/users", usersRoutes(knex));
app.use("/resources", resourcesRoutes(knex));
app.use("/topics", topicsRoutes(knex));
app.use("/register", registerRoutes(knex));
app.use("/login", loginRoutes(knex));
app.use("/logout", logoutRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
