var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
//var fs = require('fs')


 var mongo = require('mongodb').MongoClient;



bot.on('message', function(msg) {
  const chatId = msg.from.id, date = msg.date;
  bot.sendMessage(chatId, 'Received your message: '+date);
});


var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
mongo.connect('mongodb://admin:admin@ds235778.mlab.com:35778/heroku_2l11m0jl',  function(error, db){
	if(error) {
		res.write(error+'\n');
	} else {
		var collection = db.db('heroku_2l11m0jl').collection('messages');
		var user = {name: "Tom", age: 23};
		collection.insertOne(user, function(err, result){
				if(err){ 
					return;
				}
				db.close();
		});		
	}
});
  
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));