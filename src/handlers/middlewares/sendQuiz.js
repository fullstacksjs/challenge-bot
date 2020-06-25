const { Composer } = require("telegraf");
const { CronJob } = require("cron");
const db = require("../../store");

const bot = new Composer();

const groups = db.get("groups").value();
//3:30 thu,mon to
for (const group of groups) {
  const {
    quizTime: { min, hour, days },
  } = group;
  const pattern = `${min} ${hour} * * ${days.join(",")}`;

  const job = new CronJob(pattern, async () => {
    try {
      const quiz = await db.get("quizzes").shift().value();

      //TODO make code pic using `quiz.description`

      await bot.telegram.replyWithQuiz(group.id, quiz.title, quiz.options, {
        correct_option_id: quiz.answerIndex,
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  job.start();
}
module.exports = bot;
