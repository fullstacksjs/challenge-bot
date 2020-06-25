const { toInteger } = require("../../util/functions");
const daysFormats = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
// example args :
const args = "5:30 1,3";

const handler = (ctx) => {
  // const { args } = ctx.state.command;
  const [rawTime, rawDays] = args.split(" ");

  const [hour, min] = rawTime.split(":").map(toInteger);
  if ([hour, min].some(isNaN)){
    return ctx.reply("given hour/minute is not a number")
  }
    if (hour >= 24 || hour < 1 || min >= 60 || min < 0) {
      return ctx.reply(" given hour/minute is not right");
    }

  const daysIndex = rawDays.split(",").map(toInteger);
  const validDays = daysIndex.every((day) => day >= 1 && day <= 7);
  if (!validDays) {
    return "given days are not right";
  }
  const days = daysIndex.map((dayIndex) => {
    return daysFormats[dayIndex - 1];
  });
  const { id: currId } = ctx.chat;
  ctx.db
    .get("groups")
    .find({ id: currId })
    .assign({ quizTime: { hour, min, days } });
};

module.exports = handler;
