var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
var fs = require('fs')
var MongoClient = require("mongodb").MongoClient;

url = 'mongodb://telegram-bot:ewr3377nd@ds235388.mlab.com:35388/telegram_bot';
mongoClient.connect(url, function(err, db){
     
    var collection = db.collection("users");
    var user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){
         
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        db.close();
    });
});

bot.on('message', function(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});



var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));