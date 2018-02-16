module.exports.is_number = function(value) {
	return !isNaN(value.toString().trim());
}
				
module.exports.formate = function (value) {
	return value<10?('0'+value):value;
}

module.exports.timeConverter = function(UNIX_timestamp) {
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

module.exports.nl2br = function(str) { // Inserts HTML line breaks before all newlines in a string
    return str.replace(/([^>])\n/g, '$1<br/>');
}

module.exports.transf_type = function(type) {
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
