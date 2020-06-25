const handler = (ctx) => {
  const addedGroup = ctx.chat;
  console.log("added groups");
  const defaultTime = { mins: "30", hour: "3", days: ["tue", "thu"] };
  addedGroup.quizTime = defaultTime;
  ctx.db.get("groups").push(addedGroup).write();
};

module.exports = handler;
