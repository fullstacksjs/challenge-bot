const handler = async (ctx, next) => {
  if (!ctx.isGroup) {
    return ctx.reply("this action must be done from a group chat");
  }
  if (!(await ctx.isAdmin)) {
    return ctx.reply("only admins are allowed to do this action");
  }
  return next();
};
module.exports = handler;
