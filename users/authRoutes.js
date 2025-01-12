const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUsername } = require('./usersmodel');
const router = express.Router();
module.exports = router;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await createUser({username, password:hashedPassword});
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
      res.status(200).json({
        message: `Welcome ${user.username}`,
        cookie: req.session.user.id
      });
    } else {
      res.status(401).json({ message: 'You shall not pass' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
