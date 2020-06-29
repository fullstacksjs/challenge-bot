const defaultTime = { mins: "30", hour: "3", days: ["tue", "thu"] };

const handler = (ctx, next) => {
  ctx.chat.quizTime = defaultTime;

  return next();
};

module.exports = handler;
