const { sendQuizHof } = require("../../hof");
const { createCronJob } = require("../../util/functions");

const handler = (ctx) => {
    
  ctx.session.jobs = ctx.session.jobs || {};
  const { id, quizTime } = ctx.chat;
  const callback = sendQuizHof(id, ctx);
  const job = createCronJob(quizTime, callback);
  Object.assign(ctx.session.jobs, { [id]: job });

};
module.exports = handler;
