const express = require('express');
const users = require('./users/authRoutes');
const session = require('express-session');

const server = express();
const sessionConfig = {
    name: 'wesmoketrees',
    secret: 'lyrics by santi',
    cookies: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

}

server.use(express.json());
server.use(session(sessionConfig));
server.use('/auth/', users);

module.exports = server;
