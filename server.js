const express = require('express');
const auth = require('./users/authRoutes');
const users = require('./users/userRoutes');
const session = require('express-session');

const server = express();
const sessionConfig = {
  name: 'wesmoketrees',
  secret: 'lyrics by santi',
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/auth/', auth);
server.use('/api/users/', users);

module.exports = server;
