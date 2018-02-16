var TelegramBot = require('node-telegram-bot-api');
var token = '541428253:AAEQXJyWUkj79-hZzWMe4QYUk3n6OHxw6lQ'; 
var bot = new TelegramBot(token, {polling: true});
var mongo = require('mongodb').MongoClient;



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
							'<td style="text-align: left;">'+nl2br(results[i]['text'])+'</td>'+
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