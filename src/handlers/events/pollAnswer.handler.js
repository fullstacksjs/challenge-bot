const handler = (ctx) => {
  const { prevPoll } = ctx.session;

  if (prevPoll) {
    const {
      user: { first_name: name, username },
      option_ids,
    } = ctx.answer_poll;
    const [userAnswerIndex] = option_ids;
    const { correct_option_id: answerIndex, id } = prevPoll;
    const userState = ctx.db.get(["leaderboard", id, username], null);
    if (!userState) {
      ctx.db.get("leaderboard").update((lb) => {
        if (!lb[id]) {
          lb[id] = {};
        }
        Object.assign(lb[id], { [username]: { name, rights: 0, wrongs: 0 } });
        return lb;
      });
    }
    const anwersState = answerIndex === userAnswerIndex ? "rights" : "wrongs";

    userState.update(anwersState, (r) => r + 1).write();
  }
};
module.exports = handler;
