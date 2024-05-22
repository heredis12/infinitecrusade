const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "";
const server = express();
const bot = new TelegramBot(TOKEN,{
    polling:true
});
const port = process.env.PORT || 5000;
const gameName = "InfiniteCrusade";
const queries = {};
server.use(express.static(path.join(__dirname,'')));
bot.onText(/help/,(msg) => bot.sendMessage(msg.from.id, "Say /game if you want to play."));
bot.onText(/start|game/,(msg)=> bot.sendGame(msg.from.id,gameName));
bot.on("callback_query", function(query){
    if(query.game_short_name != gameName){
        bot.answerCallbackQuery(query.id, "Sorry, '"+query.game_short_name+"' is not available.");    
    }else{
        queries[query.id] = query;
        let gameurl = "";
        bot.answerCallbackQuery({
            callback_query_id:query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function(iq){
    bot.answerInlineQuery(iq.id,[{
        type: "game",
        id: "0",
        game_short_name: gameName
    }])
});
server.get("/highscore/:score", function(req,res,next){
});