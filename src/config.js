require('dotenv').config();
const path = require('path');

const config = {
  token: process.env.BOT_TOKEN,
  logger: console,
  dbPath: path.join(__dirname, 'store.json'),
};

module.exports = config;
