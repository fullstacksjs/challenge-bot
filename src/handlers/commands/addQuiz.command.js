const { actions } = require('../../util');

const handler = async (ctx) => {
  ctx.reply(
<<<<<<< HEAD
    'ok send me some content about the quiz\n\n' +
      'note : usually you would want to send a code here'
  );
  ctx.session.currentQuiz = {};
  ctx.session.action = actions.content;
=======
    'ok send me some description about the quiz\n\n' +
      'note : usually you would want to send a code here'
  );
  ctx.session.currentQuiz = {};
  ctx.session.action = actions.description;
>>>>>>> 7b246ba98baaa72a664cd00426722c8d9867c91e
};

module.exports = handler;
