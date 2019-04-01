const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile').development;
const bcrypt = require('bcryptjs');

const db = knex(knexConfig);

const routes = express.Router();

routes.use(express.json());

routes.post('/register', async (req, res) => {
	try {
		const user = req.body;
		const hash = bcrypt.hashSync(user.password, 10);

		user.password = hash;
		newUser = db('User').insert(user);
		if (user) {
			res.status(201).json(user);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at register' });
	}
});

module.exports = routes;
