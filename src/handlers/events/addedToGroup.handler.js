const createCronJob = require("../middlewares/scheduledQuizShare.hanlder");
const { sendQuizHof } = require("../../hof");

const defaultTime = { mins: "30", hour: "3", days: ["tue", "thu"] };

const handler = (ctx) => {
  const addedGroup = ctx.chat;
  addedGroup.quizTime = defaultTime;

  const { quizTime, id } = addedGroup;
  const callback = sendQuizHof(id, ctx);
  const job = createCronJob(quizTime, callback);
  ctx.session.jobs.push({ [id]: job });

  console.log("added groups");

  ctx.db.get("groups").push(addedGroup).write();
};

module.exports = handler;
