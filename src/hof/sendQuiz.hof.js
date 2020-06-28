const hof = (groupID, ctx) => async () => {
  try {
    const quiz = await ctx.db.get('quizzes').shift();

    //TODO make code pic using `quiz.content`

    await ctx.telegram.sendQuiz(groupID, quiz.title, quiz.options, {
      correct_option_id: quiz.answerIndex,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = hof;
