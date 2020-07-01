const { Composer } = require("telegraf");
const addQuizHandler = require("./addQuiz.command");
const scheduleHanlder = require("./schedule.command");
const { adminOnly, setupSchedule } = require("../middlewares");

const bot = new Composer();

bot.command("add", addQuizHandler);
bot.command("schedule", adminOnly, scheduleHanlder, setupSchedule);
bot.command("reconfig", adminOnly, setupSchedule);
bot.command("test", async (ctx) => {
  console.log(ctx.state.command.args);

  const data = await ctx.replyWithQuiz("stuff", ["stuff1", "stuff2"], {
    correct_option_id: 1,
    is_anonymous: false,
  });
  console.log(data);
});

module.exports = bot;
