const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile').development;
const bcrypt = require('bcryptjs');
const isAuthed = require('./middleware/isAuth');

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
			req.session.user = user;
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
		const user = await db('User').where({ username: credentials.username }).first();
		if (!credentials || !bcrypt.compareSync(credentials.password, user.password)) {
			res.status(401).json({ message: 'You shall not pass!!!' });
		} else {
			req.session.user = user;
			res.status(200).send('Logged in');
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at login' });
	}
});

routes.get('/users', isAuthed, async (req, res) => {
	try {
		users = await db('User');
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at getting the data' });
	}
});

routes.get('/logout', async (req, res) => {
	try {
		if (req.session) {
			err = await req.session.destroy();
			if (err) {
				res.status(200).json({ message: 'You are logged out' });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at logout' });
	}
});

module.exports = routes;
