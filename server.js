const express = require('express');
const users = require('./users/userRoutes');

const server = express();
server.use(express.json());
server.use('/api/', users)

module.exports = server;