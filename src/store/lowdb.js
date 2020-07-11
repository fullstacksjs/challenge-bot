const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { isEmptyObject } = require('../utils/object.utils');

function seedDb(db) {
  const defaultData = { quizzes: [], sendQuizzes: {} };
  const dbValue = db.value();

  if (isEmptyObject(dbValue) || Object.keys(defaultData).some(key => !Reflect.has(dbValue, key))) {
    db.defaults(defaultData).write();
  }
}

function initDb(dbPath) {
  const adapter = new FileSync(dbPath);
  const db = low(adapter);
  seedDb(db);

  return db;
}

module.exports = initDb;
