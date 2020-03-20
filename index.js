const config = require("./config.js");
const bot = require('./bot.js');

if (config.bot && config.bot.group_id)
    bot.Main();
else
    console.error("Бот не настроен. Пожалуйста, откройте config.js и настройте бота");