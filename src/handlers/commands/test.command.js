const handler = async (ctx) => {
  ctx.reply("check the console");
  console.log(ctx.session.currentQuiz);
  const things = ctx.db.get("groups").value();
  console.log(things);
};

module.exports = handler

