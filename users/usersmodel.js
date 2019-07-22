const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

module.exports = {
  createUser,
  findUsername
};

function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 10);
  return db('users')
    .insert(user)
    .then(ids => findUser(ids[0]));
}

function findUser(id) {
  return db('users').where({ id });
}

function findUsername(username) {
  return db('users').where({ username });
}
