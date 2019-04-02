const express = require('express');
const helmet = require('helmet');
const userRoute = require('../api/userRoute');
const session = require('express-session');

const server = express();

const sessionConfig = {
	name: 'Cookie',
	secret: 'should be a secret',
	cookie: {
		maxAge: 1 * 24 * 60 * 60 * 1000,
		secure: false
	},
	httpOnly: true,
	resave: true,
	saveUninitialized: true
};

server.use(helmet());

server.use(session(sessionConfig));

server.use('/api', userRoute);

module.exports = server;
