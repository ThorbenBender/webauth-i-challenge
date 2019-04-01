const express = require('express');
const helmet = require('helmet');
const userRoute = require('../api/userRoute');

const server = express();

server.use(helmet());

server.use('/api', userRoute);

module.exports = server;
