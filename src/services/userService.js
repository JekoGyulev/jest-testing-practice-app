const { v4: uuid } = require('uuid');

const users = new Map();

async function createUser({ name, email }) {
  if (!name || !email) {
    const err = new Error('Name and email are required');
    err.status = 400;
    throw err;
  }

  const id = uuid();
  const user = { id, name, email, createdAt: new Date() };
  users.set(id, user);

  return user;
}

async function getUserById(id) {
  if (!users.has(id)) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return users.get(id);
}

module.exports = { createUser, getUserById };
