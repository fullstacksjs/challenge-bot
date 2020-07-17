const Telegraf = require("telegraf");
const store = require("../store");

class Context extends Telegraf.Context {
  constructor(update, telegram, options) {
    super(update, telegram, options);
    this.db = store;
  }
  get isGroup() {
    const { type = "private" } = this.chat;
    console.log(type);
    return Boolean(type.match(/group/));
  }
  //NOTE function below is asynchronous
  //meaning that it returns a promise

  get isAdmin() {
    const { telegram, message } = this;

    return (async () => {
      const member = await telegram
        .getChatMember(message.chat.id, message.from.id)
        .catch(console.error);

      const isCreatorOrAdmin = member.status === "creator" || member.status === "administrator";
      return member && isCreatorOrAdmin;

      //or just
      // return (
      //   member &&
      //   (member.status === "creator" || member.status === "administrator")
      // )
    })();
  }
  clearQuizSession() {
    Reflect.deleteProperty(this.session, "currentQuiz");
    Reflect.deleteProperty(this.session, "action");
  }
}
module.exports = Context;
