const Telegraf = require("telegraf");
const store = require("../store");

class Context extends Telegraf.Context {
  constructor(update, telegram, options) {
    super(update, telegram, options);
    this.db = store;
  }
  get isGroup() {
    const { type = "private" } = this.chat;

    return Boolean(type.match(/group/));
  }

  clearQuizSession() {
    delete this.session.currentQuiz
    delete this.session.action 
  }
}
module.exports = Context;
