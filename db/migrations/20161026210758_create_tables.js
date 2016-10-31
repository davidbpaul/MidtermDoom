'use strict';
exports.up = (knex, Promise) => {
  return knex.schema
  .createTable('users', (table) => {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.string('password');
  })
  .createTable('resources', (table) => {
    table.increments('id');
    table.string('link');
    table.string('name');
    table.string('description');
    table.integer('user_id');
  })
  .createTable('user_resource', (table) => {
    table.integer('user_id');
    table.integer('resource_id');
  })
  .createTable('comments', (table) => {
    table.increments('id');
    table.string('comment');
    table.integer('user_id');
    table.integer('resource_id');
  })
  .createTable('likes', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.integer('resource_id');
  })
  .createTable('ratings', (table) => {
    table.increments('id');
    table.integer('rating');
    table.integer('user_id');
    table.integer('resource_id');
  })
  .createTable('topic_resource', (table) => {
    table.integer('topic_id');
    table.integer('resource_id');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema
  .dropTable('users')
  .dropTable('resources')
  .dropTable('user_resource')
  .dropTable('comments')
  .dropTable('likes')
  .dropTable('ratings')
  .dropTable('topic_resource');
};
