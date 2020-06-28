const hof = (groupID, ctx) => async () => {
  try {
    const quiz = await ctx.db.get('quizzes').shift();

<<<<<<< HEAD
    //TODO make code pic using `quiz.content`
=======
    //TODO make code pic using `quiz.description`
    console.log('callback');
>>>>>>> 7b246ba98baaa72a664cd00426722c8d9867c91e

    await ctx.telegram.sendQuiz(groupID, quiz.title, quiz.options, {
      correct_option_id: quiz.answerIndex,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = hof;
