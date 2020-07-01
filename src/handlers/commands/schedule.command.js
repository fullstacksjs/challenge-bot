const { toInteger } = require("../../auxiliary");
const { daysFormats, scheduleHofsNames } = require("../../constants");
const splitOnFirstWhitespaceRegex = / (.*)/;
// example args :
// const args = "5:30 1,3";

const handler = (ctx, next) => {
  const { args } = ctx.state.command;
  let [scheduleName, dateArg] = args.split(splitOnFirstWhitespaceRegex);

  if (!(scheduleName in scheduleHofsNames) || !dateArg) {
    return ctx.reply(
      "what are scheduling for? and when?\n" +
        "\\schdule <schduleFor> <hour>:<minutes> <day>,<day>..."
    );
  }

  const [rawTime, rawDays] = dateArg.split(" ");
  const [hour, min] = rawTime.split(":").map(toInteger);

  if ([hour, min].some(isNaN)) {
    return ctx.reply("given hour/minute is not a number");
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
  const date = { hour, min, days };

  ctx.state.date = date;
  ctx.state.scheduleName = scheduleName;
  return next();
};

module.exports = handler;
