const express = require('express');
const routes = require('../router/user');

const server = express();
server.use(express.json());

server.use('/api', routes);

module.exports = server;

