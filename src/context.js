const Telegraf = require('telegraf');
const store = require('./store');

class Context extends Telegraf.Context {
  constructor(update, telegram, options) {
    super(update, telegram, options);
    this.db = store;
  }

  get isGroup() {
    const { type = 'private' } = this.chat;
    return Boolean(type.match(/group/));
  }

  get isAdmin() {
    const { telegram, message } = this;
    const adminRoles = ['creator', 'administrator'];
    return telegram.getChatMember(message.chat.id, message.from.id).then(member => adminRoles.includes(member?.status));
  }

  clearQuizSession() {
    Reflect.deleteProperty(this.session, 'currentQuiz');
    Reflect.deleteProperty(this.session, 'action');
  }
}

module.exports = Context;
