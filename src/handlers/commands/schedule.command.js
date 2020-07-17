const { toInteger } = require("../../util");
const { daysFormats, scheduleHofsNames } = require("../../constants");
const splitOnFirstWhitespaceRegex = / (.*)/;
// example args :
// const args = "5:30 1,3";

const handler = (ctx, next) => {
  const { args } = ctx.state.command;
  let [scheduleName, dateArg] = args.split(splitOnFirstWhitespaceRegex);
  const date = {};

  if (!(scheduleName in scheduleHofsNames) || !dateArg) {
    return ctx.reply(
      "what are scheduling for? and when?\n" +
        "\\schdule <schduleFor> <hour>:<minutes> w<day-of-week>,w<day-of-week>..| <day-of-month>,..."
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

  const areWeekDays = daysIndex.every((day) => day.match(/^w/));
  if (areWeekDays) {
    const validWeekDays = daysIndex.every((day) => day >= 1 && day <= 7);
    if (!validWeekDays) {
      return ctx.reply("given daysOfWeek are not right");
    }
    const daysOfWeek = daysIndex.map((dayIndex) => {
      return daysFormats[dayIndex - 1];
    });
    Object.assign(date, { daysOfWeek });
  } else {
    const validMonthDays = daysIndex.every((day) => day >= 1 && day <= 30);
    if (!validMonthDays) {
      return ctx.reply("given MonthDays are not right");
    }
    const daysOfMonth = daysIndex;
    Object.assign(date, { daysOfMonth });
  }

  ctx.state.date = [date];
  ctx.state.scheduleName = [scheduleName];
  return next();
};

module.exports = handler;
