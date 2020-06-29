const { contentTypes } = require("../constants");

const hof = (ctx) => async () => {
  try {
    const quiz = await ctx.db.get("quizzes").shift();
    //NOTE if u want to test replace shift with .value()[0];

    let replyData = null;
    if (quiz.content.type === contentTypes.photo) {
      replyData = await ctx.replyWithPhoto(quiz.content.value);
    } else if (quiz.content.type === contentTypes.video) {
      replyData = await ctx.replyWithVideo(quiz.content.value);
    } else {
      replyData = await ctx.replyWithMarkdown(quiz.content.value, { parse_mode: "code" });
    }
    await ctx.replyWithQuiz(quiz.title, quiz.options, {
      correct_option_id: quiz.answerIndex,
      reply_to_message_id: replyData.message_id,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = hof;
