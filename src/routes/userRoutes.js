const express = require('express');
const { createUser, getUserById } = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
