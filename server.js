var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
//var fs = require('fs')


 var mongo = require('mongodb').MongoClient;



bot.on('message', function(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});


var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
mongo.connect('11',  function(error, db){
	if(error) {
		res.write(error+'\n');
	}
});
  
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));