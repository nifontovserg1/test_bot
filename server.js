var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
//var fs = require('fs')

var url = 'mongodb://admin1:admin@ds235778.mlab.com:35778/heroku_2l11m0jl';

var connect = require('connect'),
  mongo = require('mongodb').MongoClient;



bot.on('message', function(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});


var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
mongo.connect(url, {}, function(error, db){
	res.write(error);
});
  
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));