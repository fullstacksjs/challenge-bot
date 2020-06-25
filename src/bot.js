const Telegraf = require("telegraf");
const session = require("telegraf/session");
const { Context } = require("./util");
const events = require("./handlers/events");
const commands = require("./handlers/commands");

function createBot({ token }) {
  const bot = new Telegraf(token, { contextType: Context });

  //...configs
  //...
  //..
  bot.use(session());

  bot.start((ctx) => ctx.reply("Welcome"));


  //TODO
  // bot.command("quiz", async (ctx) => {
  //   try {
  //     const quiz = await ctx.db.get("quizzes").value()[0];
  //     console.log(quiz);

  //     // const { id } = ctx.chat;
  //     // await ctx.telegram.sendQuiz(id, quiz.title, quiz.description, {
  //     //   correct_option_id: 1,
  //     // });

  //     await ctx.replyWithQuiz(quiz.title, quiz.options, {
  //       correct_option_id: quiz.answerIndex,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  bot.use(commands);
  bot.use(events);

  return bot;
}

module.exports = createBot;
