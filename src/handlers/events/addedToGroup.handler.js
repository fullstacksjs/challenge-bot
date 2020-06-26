const defaultTime = { mins: "30", hour: "3", days: ["tue", "thu"] };

const handler = (ctx, next) => {
  ctx.chat.quizTime = defaultTime;
  console.log("added to group");

  // ctx.db.get("groups").push(ctx.chat).write();
  return next();
};

module.exports = handler;
