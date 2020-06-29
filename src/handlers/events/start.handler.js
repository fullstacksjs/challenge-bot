const handler = (ctx) => {
  if (ctx.isGroup) {
    return ctx.reply("I'm redy");
  }
  return ctx.reply("Welcome");
};
module.exports = handler;
