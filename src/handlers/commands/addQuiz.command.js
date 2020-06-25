const { actions } = require("../../util");

const handler = async (ctx) => {
  ctx.reply(
    "ok send me some description about the quiz\n\n" +
      "note : usually you would want to send a code here"
  );
  ctx.session.currentQuiz = {};
  ctx.session.action = actions.description;
  console.log("add", ctx.session.action);
};

module.exports = handler;
