const Telegraf = require("telegraf");
const session = require("telegraf/session");
const { Context } = require("./util");
const events = require("./handlers/events");
const commands = require("./handlers/commands");
const commandParts = require("telegraf-command-parts");

function createBot({ token }) {
  const bot = new Telegraf(token, { contextType: Context });

  //TODO add bot.use for send quiz and others
  bot.use(session());
  bot.use(commandParts());

  bot.start((ctx) => ctx.reply("Welcome"));

  bot.use(commands);
  bot.use(events);

  return bot;
}

module.exports = createBot;
