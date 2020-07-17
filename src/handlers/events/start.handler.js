const { defaultDates } = require("../../constants");
const { scheduleHofsNames } = require("../../constants");
const hasProperty = require("../../util/hasProperty");

const handler = (ctx, next) => {
  const { id } = ctx.chat;
  const { jobs } = ctx.session;

  if (ctx.isGroup && !hasProperty(jobs, id)) {
    ctx.reply("I'm redy");
    ctx.state.date = Object.values(defaultDates);
    ctx.state.scheduleName = Object.keys(scheduleHofsNames);
    return next();
  }

  return ctx.reply("Welcome");
};
module.exports = handler;
