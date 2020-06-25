const { Composer } = require("telegraf");
const textHandler = require("./text.handler");
const addedToGroupHandler = require("./addedToGroup.handler");
const leftGroupHandler = require("./leftGroup.handler");
const bot = new Composer();

bot.on("text", textHandler);
bot.on("new_chat_members", addedToGroupHandler);
bot.on("left_chat_member", leftGroupHandler);
module.exports = bot;
