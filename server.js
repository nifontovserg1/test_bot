var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
//var fs = require('fs')


 var mongo = require('mongodb').MongoClient;

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
	var month =a.getMonth()+1;
	if(month<10) {
	  month = '0'+month;
	}
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;	
}

/*mongo.connect('mongodb://admin:admin@ds235778.mlab.com:35778/heroku_2l11m0jl',  function(error, db){
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
});*/

bot.on('message', function(msg) {
  const userId = msg.from.id, date = msg.date, first_name = msg.from.first_name;
  bot.sendMessage(userId, 'Received your message: '+first_name+' '+timeConverter(date));
});


var http = require('http'),
    port = process.env.PORT || 8001;
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("I'm a telegram bot \n");
}).listen(parseInt(port));