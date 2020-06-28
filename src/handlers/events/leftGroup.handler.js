const handler = (ctx) => {
  const { id } = ctx.chat;
  const job = ctx.session.jobs[id];
  job.stop();
  delete ctx.session.jobs[id];
};

module.exports = handler;
