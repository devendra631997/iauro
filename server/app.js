const express = require('express');
const routes = require('../router/user/user');
const mongoose = require('mongoose');
const { SeedDB } = require("../database/seeders/user/user")
mongoose
  .connect(
    "mongodb://mongodb-myapp:27017/myapp",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .then(() =>{
    SeedDB()
  })
  .catch(err => console.log(err));
const server = express();
server.use(express.json());

server.use('/api', routes);

module.exports = server;

