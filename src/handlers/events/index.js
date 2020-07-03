const { Composer } = require("telegraf");
const startHanlder = require("./start.handler");
const storeQuizHandler = require("./storeQuiz.handler");
const pollAnswerHanlder = require("./pollAnswer.handler");
const { setupSchedule } = require("../middlewares");
const bot = new Composer();

bot.start(startHanlder, setupSchedule);
bot.on(["text", "video", "photo"], storeQuizHandler);
bot.on("poll_answer", pollAnswerHanlder);
module.exports = bot;
