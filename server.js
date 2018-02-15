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

function logMessage(message) {
	mongo.connect('mongodb://admin:admin@ds235778.mlab.com:35778/heroku_2l11m0jl',  function(error, db){
		if(error) {
			console.log(error);
		} else {
			var collection = db.db('heroku_2l11m0jl').collection('messages');
			var log_message = {'type': message.type, 
							   'text': message.text,
							   'time': message.time,
							   'user': {
										'id': message.user.id,
										'first_name': message.user.first_name,
										'last_name': message.user.last_name?message.user.last_name:'',
										'user_name': message.user.username?message.user.username:''
							    }
							   };
			collection.insertOne(log_message, function(err, result){
					if(err){ 
						return;
					}
					db.close();
			});		
		}
	}); 
}


bot.on('message', function(msg) {
  const userId = msg.from.id, date = msg.date, 
		first_name = msg.from.first_name, last_name = msg.from.last_name, user_name = msg.from.username, msg_text = msg.text;
		logMessage({'type': 'question', 'text': msg.text, 'time': timeConverter(msg.date), 'user': msg.from});
		
		bot.sendMessage(userId, 'Received your message: '+userId+' '+first_name+' '+last_name+' '+user_name+' '+timeConverter(date)+' '+msg_text+' ');
});


var http = require('http'),
    port = process.env.PORT || 8001;
	
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello, I'm a telegram bot <br>");
  mongo.connect('mongodb://admin:admin@ds235778.mlab.com:35778/heroku_2l11m0jl',  function(error, db){

	var collection = db.db('heroku_2l11m0jl').collection('messages');
	collection.find().toArray(function(err, results) {
		
		res.write(results.length+'');
	});
	db.close();
  });
  
}).listen(parseInt(port));