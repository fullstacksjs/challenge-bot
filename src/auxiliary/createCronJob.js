const { CronJob } = require("cron");

//NOTE if you want to test write "* */1 * * * *" as the pattern
//this will trigger the callback each minute

const timeZone = "Asia/Tehran";

function createCronJob(patternObj, callback) {
  const { min, hour, days } = patternObj;
  const pattern = `00 ${min} ${hour} * * ${days.join(",")}`;
  const job = new CronJob(pattern, callback, null, false, timeZone);
  job.start();
  return job;
}

module.exports = createCronJob;
