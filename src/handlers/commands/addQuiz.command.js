const { actions } = require("../../constants");

const handler = async (ctx) => {
  ctx.reply(
    "ok send me some content about the quiz\n\n" +
      "note : usually you would want to send a code" +
      "maybe a picture or a video or even the code text here"
  );
  ctx.session.currentQuiz = {};
  ctx.session.action = actions.content;
};

module.exports = handler;
