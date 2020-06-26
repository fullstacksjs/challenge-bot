const handler = async (ctx) => {
  ctx.reply("check the console");
  // console.log(ctx.message );

  console.log(ctx.session);
  // const things = ctx.db.get("groups").value();
  // console.log(things);
};

module.exports = handler;
