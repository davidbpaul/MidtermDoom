'use strict';
exports.up = (knex, Promise) => {
  return knex.schema
  .createTable('users', (table) => {
    table.string('id');
    table.string('name');
    table.string('email');
    table.string('password');
  })
  .createTable('resources', (table) => {
    table.string('id');
    table.string('link');
    table.string('image');
    table.string('title');
    table.string('description');
    table.string('user_id')
  })
  .createTable('comments', (table) => {
    table.string('id');
    table.string('comment');
    table.string('user_id');
    table.string('resource_id');
  })
  .createTable('likes', (table) => {
    table.string('id');
    table.string('user_id');
    table.string('resource_id');
  })
  .createTable('ratings', (table) => {
    table.string('id');
    table.integer('rating');
    table.string('user_id');
    table.string('resource_id');
  })
  .createTable('topic_resource', (table) => {
    table.string('topic_id');
    table.string('resource_id');
  })
  .createTable('topics', (table) => {
    table.string('id');
    table.string('topic');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema
  .dropTable('users')
  .dropTable('resources')
  .dropTable('comments')
  .dropTable('likes')
  .dropTable('ratings')
  .dropTable('topic_resource')
  .dropTable('topics');
};
