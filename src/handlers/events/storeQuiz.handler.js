//NOTE the actions orders matter
const defaultTitle = "whats the output of this code";
const { actions, contentTypes } = require("../../constants");

const getContent = (ctx) => {
  const {
    message: { photo, text, video },
  } = ctx;
  let contentValue = text;
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

  ctx.session.currentQuiz.content = { value: contentValue, type: contentType };
  console.log(ctx.session);

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
    return ctx.reply("there should be at least 2 options\n" + "try sending the options again");
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
  const { content } = ctx.session.currentQuiz;
  if (isNaN(answer)) {
    answer = content.indexOf(answer);
  } else {
    answer--;
  }

  if (answer === -1 || answer > content.length) {
    return ctx.reply("index or text was not in the options\n" + "try sending it again");
  }

  ctx.session.currentQuiz.answerIndex = answer;

  await ctx.db.get("quizzes").push(ctx.session.currentQuiz).write();
  console.log("cleared");

  ctx.clearQuizSession();

  return ctx.reply("ok done \n your quiz have been stored");
};

const handler = async (ctx) => {
  // console.log("text", action);
  // console.log(ctx.message.photo.file_id);
  // const { file_id } = await ctx.message.photo;
  // console.log(await ctx.telegram.getFile(ctx.message.photo.file_id));

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
