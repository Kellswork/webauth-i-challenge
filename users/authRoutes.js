const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUsername } = require('./usersmodel');
const router = express.Router();
module.exports = router;

router.post('/register', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'could not create user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await findUsername(username).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line require-atomic-updates
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
