const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'data.json'));
const db = low(adapter);
const defaultData = { quizzes: [] };
const dbValue = db.value();

// Set some defaults,
//if the JSON file is empty or some of the properties are missing
if (Object.keys(dbValue).length === 0 || !Object.keys(defaultData).every((key) => key in dbValue))
  db.defaults(defaultData).write();

module.exports = db;
