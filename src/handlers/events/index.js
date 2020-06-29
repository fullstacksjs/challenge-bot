const { Composer } = require("telegraf");
const startHanlder = require("./start.handler");
const storeQuizHandler = require("./storeQuiz.handler");
const leftGroupHandler = require("./leftGroup.handler");
const addedToGroupHandler = require("./addedToGroup.handler");
const { createOrUpateHandler } = require("../middlewares");

const bot = new Composer();

bot.start(startHanlder);
bot.on(["text", "video", "photo"], storeQuizHandler);
bot.on("new_chat_members", addedToGroupHandler, createOrUpateHandler);
bot.on("left_chat_member", leftGroupHandler);

module.exports = bot;
