const Telegraf = require('telegraf');
const session = require('telegraf/session');
const commandParts = require('telegraf-command-parts');
const { Context } = require('./util');
const events = require('./handlers/events');
const commands = require('./handlers/commands');

function createBot({ token }) {
  const bot = new Telegraf(token, { contextType: Context });

  bot.use(session());
  bot.use(commandParts());
  bot.use(commands);
  bot.use(events);
  bot.catch(err => console.error(err));

  return bot;
}

module.exports = createBot;
