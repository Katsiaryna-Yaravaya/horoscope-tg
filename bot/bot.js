const {Telegraf} = require('telegraf')
const TOKEN = '6786002429:AAHkBtjrWD04_gHv9-am33CsH7XU5pqo_X4'
const bot = new Telegraf(TOKEN)
const web_link = "https://horoscopesz.netlify.app"

bot.start((ctx) => {
    return ctx.reply("welcome web", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Web app', web_app: {url: web_link}}
                ]
            ]
        }
    })
})

bot.launch()
