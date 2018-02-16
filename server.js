var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
var mongo = require('mongodb').MongoClient;

var reg_exps = {'hi': /^\s*(З|з)дравствуйте\s*(.|!)?$|(П|п)ривет(ствую)?\s*(.|!)?$|(Д|д)обрый\s*(день|вечер)\s*(.|!)?$|(Д|д)оброе утро\s*(.|!)?$|(Д|д)оброго времени суток\s*(.|!)?\s*$/,
				'site_build_request': /((((Я|я)\s+)?((Х|х)очу|планирую))|(((М|м)не\s+)?((Н|н)адо|(Х|х)отелось (бы)?|(Т|т)ребуется)))\s+(сделать|создать|разработать|спроектировать)\s+(веб-)?сайт/,
				}

function formate(value) {
	return value<10?('0'+value):value;
}

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	a.setHours(a.getHours()+3)
    var year = a.getFullYear();
	var month = formate(a.getMonth()+1);

	var date = formate(a.getDate());
	var hour = formate(a.getHours());
	var min = formate(a.getMinutes());
	var sec = formate(a.getSeconds());
	var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;	
}

function nl2br( str ) { // Inserts HTML line breaks before all newlines in a string
    return str.replace(/([^>])\n/g, '$1<br/>');
}

function transf_type(type) {
	switch(type) {
		case 'question':
			return 'вопрос';
			break;
		case 'answer':
			return 'ответ';
			break;
		default:
			return '';
	}
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
		var answer_text = 'К сожалению, затрудняюсь ответить';
		if(reg_exps['hi'].test(msg.text)) {
			answer_text = 'Здравствуйте. Чему могу Вам помочь?';
		}
		logMessage({'type': 'answer', 'text': answer_text, 'time': timeConverter(msg.date), 'user': msg.from});
		bot.sendMessage(userId, answer_text);
});


var http = require('http'),
    port = process.env.PORT || 8001;
	
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<style>'+
				'table {'+
					'border-collapse: collapse;'+
					'text-align: center;'+						
				'}'+
				'th:not(.borderless), td:not(.borderless) {'+
					'border: solid 1px;'+ 
					'padding: 2px;'+
				'}'+
				'.borderless {'+
					'padding-left: 5px;'+
				'}'+
			'</style>')
  res.write('<script>'+
				'document.addEventListener("DOMContentLoaded", function() {'+
					'document.getElementById("rel_btn").addEventListener("click", function() {'+
						'window.location.reload()'+
					'});'+
				'});'+
			'</script>');

  mongo.connect('mongodb://admin:admin@ds235778.mlab.com:35778/heroku_2l11m0jl',  function(error, db){

	var collection = db.db('heroku_2l11m0jl').collection('messages');
	collection.find().sort({_id : -1}).toArray(function(err, results) {
		res.write('<div style="margin-bottom: 10px"> Размер истории: '+results.length+' <button style="margin-left: 10px" id="rel_btn"> Обновить </button> </div>');
		if(results.length) {
			res.write('<table>'+
						'<tr>'+
							'<th>Время</th>'+
							'<th>Текст</th>'+
							'<th>Пользователь</th>'+
							'<th>Тип</th>'+
						'</tr>');

			for(var i = 0; i < results.length; i++) {
				res.write('<tr>'+
							'<td>'+results[i]['time']+'</td>'+
							'<td>'+nl2br(results[i]['text'])+'</td>'+
							'<td>'+
								'<table style="text-align: left">'+
									'<tr><td class="borderless">id:</td> <td class="borderless">'+results[i]['user']['id']+'</td></tr>'+
									'<tr><td class="borderless">имя:</td> <td class="borderless">'+results[i]['user']['first_name']+'</td></tr>'+
									'<tr><td class="borderless">фамилия:</td> <td class="borderless">'+results[i]['user']['last_name']+'</td></tr>'+
									'<tr><td class="borderless">ник:</td> <td class="borderless">'+results[i]['user']['user_name']+'</td></tr>'+
								'</table>'+
							'</td>'+
							'<td>'+transf_type(results[i]['type'])+'</td>'+							
						  '</tr>');
			}
		}
		res.end();
	});
	db.close();
  });
  
}).listen(parseInt(port));