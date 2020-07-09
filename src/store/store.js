const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'store.json'));
const db = low(adapter);
const defaultData = { quizzes: [], sendQuizzes: {} };
const dbValue = db.value();

// Set some defaults,
// if the JSON file is empty or some of the properties are missing
if (Object.keys(dbValue).length === 0 || !Object.keys(defaultData).every(key => key in dbValue))
  db.defaults(defaultData).write();

module.exports = db;
