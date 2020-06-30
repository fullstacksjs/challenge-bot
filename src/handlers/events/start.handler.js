const { defaultDate } = require("../../constants");

const handler = (ctx, next) => {
  const { id } = ctx.chat;
  const { jobs } = ctx.session;

  if (ctx.isGroup && !(id in jobs)) {
    ctx.reply("I'm redy");
    ctx.chat.quizTime = defaultDate;
    return next();
  }

  return ctx.reply("Welcome");
};
module.exports = handler;
