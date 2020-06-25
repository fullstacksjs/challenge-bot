const { CronJob } = require("cron");

function createCronJob(patternObj, callback) {
  const { min, hour, days } = patternObj;
  const pattern = "1 * * * *";
  // `${min} ${hour} * * ${days.join(",")}`;

  const job = new CronJob(pattern, callback);

  job.start();
  return job;
}

module.exports = createCronJob;
