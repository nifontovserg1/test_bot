var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});

bot.onText( function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});



var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));