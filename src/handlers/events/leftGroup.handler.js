const handler = (ctx) => {
  const { id } = ctx.chat;
  if (ctx.session.jobs && id in ctx.session.jobs) {
    const job = ctx.session.jobs[id];
    job.stop();
    delete ctx.session.jobs[id];
  }
};

module.exports = handler;
