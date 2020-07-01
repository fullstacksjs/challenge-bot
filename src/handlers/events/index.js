const { Composer } = require("telegraf");
const startHanlder = require("./start.handler");
const storeQuizHandler = require("./storeQuiz.handler");
const { setupScheduledQuiz } = require("../middlewares");

const bot = new Composer();

bot.start(startHanlder, setupScheduledQuiz);
bot.on(["text", "video", "photo"], storeQuizHandler);
bot.on(["poll_answer"], (ctx) => {
  console.log(ctx.pollAnswer, ctx.poll);
});
module.exports = bot;
