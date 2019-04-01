exports.up = function(knex, Promise) {
	return knex.schema.createTable('User', (table) => {
		table.increments('user_id');

		table.string('username', 128).notNullable().unique();

		table.string('password', 128).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('User');
};
