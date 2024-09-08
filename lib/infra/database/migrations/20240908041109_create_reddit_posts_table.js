exports.up = function(knex, Promise) {
  return knex.schema.createTable('reddit_posts', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.timestamp('created_at').notNullable();
    table.integer('ups').notNullable();
    table.integer('comments_count').notNullable();
    table.unique(['title', 'author', 'created_at']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reddit_posts');
};
