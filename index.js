const { Telegraf, Markup } = require('telegraf')

const token = "7054554428:AXE3dy3KJ0M82JwMkaLyT5SyuM3gqDkAfK8";
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const gameShortName = 'infinitecrusade'
const gameUrl = 'https://heredis12.github.io/infinitecrusade/'

const markup = Markup.inlineKeyboard([
  Markup.button.game('🎮 Play now!'),
  Markup.button.url('Telegraf help', 'http://telegraf.js.org')
])

const bot = new Telegraf(token)
bot.start((ctx) => ctx.replyWithGame(gameShortName))
bot.command('foo', (ctx) => ctx.replyWithGame(gameShortName, markup))
bot.gameQuery((ctx) => ctx.answerGameQuery(gameUrl))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))