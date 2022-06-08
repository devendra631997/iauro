const express = require('express');
const routes = require('../router/user/user');
const mongoose = require('mongoose');
const { SeedDB } = require("../database/seeders/user/user")
const server = express();
server.use(express.json());

server.use('/api', routes);

module.exports = server;

