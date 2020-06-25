const handler = (ctx) => {
  const leftGroup = ctx.chat;
  ctx.db.get("groups").remove({ id: leftGroup.id }).write();
  console.log(ctx.db.get("groups").find({ id: leftGroup.id }).value());
};

module.exports = handler;
