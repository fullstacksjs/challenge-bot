const { actions, contentTypes, defaultTitle } = require("../../constants");
const { toInteger } = require("../../util");

const getContent = (ctx) => {
  const { session } = ctx;
  const { photo, text, video } = ctx.message;

  // as default we assume that the type is text
  let contentValue = "```" + text + "```";
  let contentType = contentTypes.text;

  if (photo) {
    const { file_id } = photo[photo.length - 1];
    contentValue = file_id;
    contentType = contentTypes.photo;
  } else if (video) {
    const { file_id } = video;
    contentValue = file_id;
    contentType = contentTypes.video;
  }

  if (!contentValue) {
    return ctx.reply(
      "wrong format you can only send photo video or text\n" + "try sending it again"
    );
  }

  session.currentQuiz.content = { value: contentValue, type: contentType };
  session.action = actions.title;

  return ctx.reply(
    "ok send me the title\n" +
      `note: usually you would write somthing like '${defaultTitle}'\n` +
      "write 'skip' to write the default title"
  );
};

const getTitle = (ctx) => {
  const { session } = ctx;
  let { text } = ctx.message;
  if (text === "skip") {
    text = defaultTitle;
  }
  session.currentQuiz.title = text;
  session.action = actions.options;
  return ctx.reply(
    "ok send me the options separated with new lines\n" +
      "example:\n\n" +
      "option-1\n" +
      "option-2\n" +
      "option-3"
  );
};

const getOptions = (ctx) => {
  const { session } = ctx;
  const { text } = ctx.message;

  const options = text.split("\n");
  if (options.length < 2) {
    return ctx.reply("there should be at least 2 options\n" + "try sending the options again");
  }
  console.log("oh no");

  session.currentQuiz.options = options;
  session.action = actions.correctAnswer;

  return ctx.reply(
    "perfect, now send me the correct answer\n" +
      "you can send the correct one by\n\n" +
      "1. sending the answer's text\n" +
      "2. sending the correct one's index"
  );
};

const getCorrectAnswer = async (ctx) => {
  const { session } = ctx;
  const { text } = ctx.message;

  let answer = toInteger(text);
  const { value: contentValue } = session.currentQuiz.content;
  if (isNaN(answer)) {
    answer = contentValue.indexOf(answer);
  } else {
    answer--;
  }

  if (answer === -1 || answer > contentValue.length) {
    return ctx.reply("index or text was not in the options\n" + "try sending it again");
  }

  session.currentQuiz.answerIndex = answer;

  await ctx.db.get("quizzes").push(session.currentQuiz).write();
  ctx.clearQuizSession();

  return ctx.reply("ok done \n your quiz have been stored");
};

const handler = async (ctx) => {
  const { action } = ctx.session;

  switch (action) {
    case actions.content:
      getContent(ctx);
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
