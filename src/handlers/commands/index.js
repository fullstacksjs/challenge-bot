const { Composer } = require("telegraf");
const addQuizHandler = require("./addQuiz.command");
const testHandler = require("./test.command");
const bot = new Composer();

bot.command("add", addQuizHandler);
bot.command("test",testHandler);

module.exports = bot;
