const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { Telegraf } = require('telegraf');

const db = require('./data/database');
const User = require('./models/manage-subscription');
const getWeather = require('./util/weather');

const app = express();
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(express.static('static'))
app.use(express.json());


// expressApp.use(bot.webhookCallback('/secret-path'))
// bot.telegram.setWebhook('<YOUR_CAPSULE_URL>/secret-path')
bot.launch();

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Weather updater, You can /subscribe to get an update ', {
    })
})

bot.command('subscribe', ctx => {
    const addUser = new User(ctx.message.from.id, ctx.message.from.first_name);

    addUser.subscribe().then(message => {
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

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');

    User.fetch().then(users => {
        if (users) {
            users.forEach(element => {
                console.log('test1');
                getWeather().then(weatherReport => {
                    bot.telegram.sendMessage(element.userId, weatherReport);
                });
            });
        }
    })
});

db.connectToDatabase().then(function () {
    app.listen(3000);
});