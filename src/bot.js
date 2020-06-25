const Telegraf = require("telegraf");
const session = require("telegraf/session");
const { Context } = require("./util");
const commandParts = require("telegraf-command-parts");
const events = require("./handlers/events");
const commands = require("./handlers/commands");
const { scheduledQuizShare } = require("./handlers/middlewares");

const initSession = { jobs: [] };

function createBot({ token }) {
  const bot = new Telegraf(token, { contextType: Context });

  bot.use(session(initSession));
  bot.use(commandParts());

  bot.use(scheduledQuizShare);
  bot.use(commands);
  bot.use(events);

  return bot;
}

module.exports = createBot;
