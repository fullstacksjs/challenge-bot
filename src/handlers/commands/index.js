const { Composer } = require('telegraf');
const { adminOnly, setupSchedule } = require('../middlewares');
const addQuizHandler = require('./addQuiz.command');
const scheduleHanlder = require('./schedule.command');

const commandComposer = new Composer();

commandComposer.command('add', addQuizHandler);
commandComposer.command('schedule', adminOnly, scheduleHanlder, setupSchedule);
commandComposer.command('reconfig', adminOnly, setupSchedule);

commandComposer.command('test', async ctx => {
  console.log(ctx.state.command.args);
  ctx.reply('\u{26F2}');
  const data = await ctx.replyWithQuiz('stuff', ['stuff1', 'stuff2'], {
    correct_option_id: 1,
    is_anonymous: false,
  });

  console.log(data);
});

module.exports = commandComposer;
