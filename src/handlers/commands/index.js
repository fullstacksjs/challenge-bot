const { Composer } = require("telegraf");
const addQuizHandler = require("./addQuiz.command");
const testHandler = require("./test.command");
const scheduleHanlder = require("./schedule.command");
const groupOnly = require("../middlewares/GroupOnly.handler");
const bot = new Composer();

bot.command("add", addQuizHandler);
bot.command("test", testHandler);


bot.command("schedule", groupOnly,scheduleHanlder);

module.exports = bot;
