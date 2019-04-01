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
		newUser = await db('User').insert(user);
		if (user) {
			res.status(201).json(user);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at register' });
	}
});

routes.post('/login', async (req, res) => {
	try {
		const credentials = req.body;
		const user = await db('User').where({ username: credentials.username });
		console.log(user);
		if (!credentials || !bcrypt.compareSync(credentials.password, user[0].password)) {
			res.status(401).json({ message: 'You shall not pass!!!' });
		} else {
			res.status(200).send('Logged in');
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at login' });
	}
});

module.exports = routes;
