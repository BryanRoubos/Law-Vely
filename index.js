const seedUsers = require('./seed')
const userData = require('./data/users.json');
const db = require ('./firebase')

seedUsers(userData)