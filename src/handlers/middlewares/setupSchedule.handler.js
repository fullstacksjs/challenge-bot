const { createCronJob } = require('../../auxiliary');
const { scheduleHofsNames } = require('../../constants');

const handler = ctx => {
  const { id } = ctx.chat;
  const { scheduleNames, dates } = ctx.state;
  ctx.session.jobs = ctx.session.jobs || {};
  scheduleNames.forEach((scheduleName, index) => {
    const date = dates[index];
    if (id in ctx.session.jobs && ctx.session.jobs[scheduleName]) {
      ctx.session.jobs[id][scheduleName].stop();
    }
    const hof = scheduleHofsNames[scheduleName];
    const callback = hof(ctx);
    const job = createCronJob(date, callback); // NOTE this function also runs the job
    Object.assign(ctx.session.jobs[id], { [scheduleName]: job });
  });
};

module.exports = handler;
