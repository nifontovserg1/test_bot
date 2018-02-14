var telegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ', bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];
	
	bot.sendMessage(userId, text+' '+time);
});


var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));