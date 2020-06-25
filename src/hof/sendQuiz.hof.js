const hof = (groupID, ctx) => async () => {
    try {
      const quiz = await ctx.db
        .get("quizzes")
        // .shift()
        .value()[0];
  
      //TODO make code pic using `quiz.description`
  
      await ctx.telegram.sendQuiz(groupID.id, quiz.title, quiz.options, {
        correct_option_id: quiz.answerIndex,
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = hof
  