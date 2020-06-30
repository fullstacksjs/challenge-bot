const { Composer } = require("telegraf");
const addQuizHandler = require("./addQuiz.command");
const scheduleHanlder = require("./schedule.command");
const { adminOnly, setupScheduledQuiz } = require("../middlewares");

const bot = new Composer();

bot.command("add", addQuizHandler);
bot.command("schedule", adminOnly, scheduleHanlder, setupScheduledQuiz);
bot.command("reconfig", adminOnly, setupScheduledQuiz);

module.exports = bot;
