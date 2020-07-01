const { sendQuizHof } = require("../../hof");
const { createCronJob } = require("../../auxiliary");

const handler = (ctx) => {
  const { id } = ctx.chat;
  const { scheduleName, date } = ctx.state;
  ctx.session.jobs = ctx.session.jobs || {};

  if (id in ctx.session.jobs && ctx.session.jobs[scheduleName]) {
    ctx.session.jobs[id][scheduleName].stop();
  }
  const callback = sendQuizHof(ctx);
  const job = createCronJob(date, callback); //NOTE this function also runs the job
  Object.assign(ctx.session.jobs[id], { [scheduleName]: job });
};

module.exports = handler;
