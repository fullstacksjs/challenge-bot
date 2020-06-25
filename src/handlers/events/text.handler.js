//the actions orders matter
const defaultTitle = "whats the output of this code";
const { actions } = require("../../util");

const getdescription = (ctx) => {
  const { text } = ctx.message;

  ctx.session.currentQuiz.description = text;
  ctx.session.action = actions.title;

  return ctx.reply(
    "ok send me the title\n" +
      `note: usually you would write somthing like '${defaultTitle}'\n` +
      "write 'skip' to write the default title"
  );
};

const getTitle = (ctx) => {
  let { text } = ctx.message;
  if (text === "skip") {
    text = defaultTitle;
  }
  ctx.session.currentQuiz.title = text;
  ctx.session.action = actions.options;
  return ctx.reply(
    "ok send me the options separated with new lines\n" +
      "example:\n\n" +
      "option-1\n" +
      "option-2\n" +
      "option-3"
  );
};

const getOptions = (ctx) => {
  const { text } = ctx.message;

  const options = text.split("\n");
  if (options.length < 2) {
    return ctx.reply(
      "there should be at least 2 options\n" + "try sending the options again"
    );
  }
  console.log("oh no");

  ctx.session.currentQuiz.options = options;
  ctx.session.action = actions.correctAnswer;

  return ctx.reply(
    "perfect, now send me the correct answer\n" +
      "you can send the correct one by\n\n" +
      "1. sending the answer's text\n" +
      "2. sending the correct one's index"
  );
};

const getCorrectAnswer = async (ctx) => {
  const { text } = ctx.message;
  let answer = Number.parseInt(text);
  const { description } = ctx.session.currentQuiz;
  if (isNaN(answer)) {
    answer = description.indexOf(answer);
  } else {
    answer--;
  }

  if (answer === -1 || answer > description.length) {
    return ctx.reply(
      "index or text was not in the options\n" + "try sending it again"
    );
  }

  ctx.session.currentQuiz.answerIndex = answer;

  await ctx.db.get("quizzes").push(ctx.session.currentQuiz).write();

  ctx.clearSession();

  return ctx.reply("ok done \n your quiz have been stored");
};

const handler = async (ctx) => {
  // console.log("text", action);

  const { action } = ctx.session;

  switch (action) {
    case actions.description:
      getdescription(ctx);
      break;

    case actions.title:
      getTitle(ctx);
      break;

    case actions.options:
      getOptions(ctx);
      break;

    case actions.correctAnswer:
      getCorrectAnswer(ctx);
      break;

    default:
      ctx.reply("Sorry, I'm not programmed to reply on this kind of message");
      break;
  }
};

module.exports = handler;
