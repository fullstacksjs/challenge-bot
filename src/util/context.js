const Telegraf = require("telegraf");
const store = require("../store");

class Context extends Telegraf.Context {
  constructor(update, telegram, options) {
    super(update, telegram, options);
    this.db = store;
  }
  get isGroup() {
    console.log(this.db.has);
    const { type = "private" } = this.chat;
    console.log(type);

    return Boolean(type.match(/group/));
  }

  clearQuizSession() {
    delete this.session.currentQuiz
    delete this.session.action 
  }
}
module.exports = Context;
