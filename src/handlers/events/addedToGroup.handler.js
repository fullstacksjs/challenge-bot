const handler = (ctx) => {
  const addedGroup = ctx.chat;
  console.log("added groups");

  ctx.db.get("groups").push(addedGroup).write();
};

module.exports = handler;
