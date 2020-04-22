
exports.up = function(knex) {
   return knex.schema.createTable('users', usr => {
      usr.increments();
      usr.string('username', 255).notNullable().index();
      usr.string('password', 255).notNullable();
      usr.string('department', 255).notNullable();
   });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
