const path = require('path');
const initDb = require('./initDb');

const store = initDb(path.join(__dirname, 'store.json'));

module.exports = store;
