const express = require('express');
const { createUser } = require('./usersmodel');
const router = express.Router();
module.exports = router;

router.post('/', async (req, res) => {
    try {
    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'could not create user' });
  }
});
