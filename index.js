const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { Telegraf } = require('telegraf');

const db = require('./data/database');
const User = require('./models/manage-subscription');
const getWeather = require('./util/weather');
const routes = require('./routes/routes');
const enableCors = require('./middleware/cors');

const app = express();
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(enableCors)
app.use(express.static('static'));
app.use(express.json());
app.use(routes);


// expressApp.use(bot.webhookCallback('/secret-path'))
// bot.telegram.setWebhook('<YOUR_CAPSULE_URL>/secret-path')
bot.launch();

bot.command('start', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Weather updater, You can /subscribe to get an update ', {
    })
})

bot.command('subscribe', ctx => {
    const addUser = new User(ctx.message.from.id);

    addUser.subscribe(ctx.message.from.first_name + ' ' + ctx.from.last_name).then(message => {
        bot.telegram.sendMessage(ctx.chat.id, message, {
        })
    })
})

bot.command('unsubscribe', ctx => {
    const removeUser = new User(ctx.message.from.id);

    removeUser.unsubscribe().then(message => {
        bot.telegram.sendMessage(ctx.chat.id, message, {
        })
    })
});

cron.schedule('* 7,14,18 * * *', () => {
    // Runnin daily at 7:00, 14:00 (2:00 pm), 18:00 (6:00 pm)

    User.fetch().then(users => {
        if (users) {
            users.forEach(element => {
                getWeather().then(weatherReport => {
                    bot.telegram.sendMessage(element.userId, weatherReport);
                });
            });
        }
    })
});

db.connectToDatabase().then(function () {
    app.listen(process.env.PORT);
});