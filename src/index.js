const config = require('./config');
const createBot = require('./bot');

const bot = createBot(config);

bot.launch();
