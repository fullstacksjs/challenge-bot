const { contentTypes } = require("../constants");

const hof = (ctx) => async () => {
  try {
    const quiz = await ctx.db.get("quizzes").shift().value();
    //NOTE if u want to test remove .shift() and add [0] at the end of value();
    if (!quiz) {
      ctx.reply(
        "hmmm..it seems that the quiz list is empty\n" +
          "but this problem can be fixed by sending some quiz to me\n" +
          "to send a new quiz just start me in your private chat and send\n" +
          "the \\add command (you'll get more info of how to add in pv)"
      );
    }
    let replyData = null;
    if (quiz.content.type === contentTypes.photo) {
      replyData = await ctx.replyWithPhoto(quiz.content.value);
    } else if (quiz.content.type === contentTypes.video) {
      replyData = await ctx.replyWithVideo(quiz.content.value);
    } else {
      replyData = await ctx.reply(quiz.content.value, { parse_mode: "MarkdownV2" });
    }
    const { poll } = await ctx.replyWithQuiz(quiz.title, quiz.options, {
      correct_option_id: quiz.answerIndex,
      reply_to_message_id: replyData.message_id,
    });
    ctx.session.prevPoll = poll;
  } catch (err) {
    console.error(err);
  }
};

module.exports = hof;
