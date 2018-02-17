var randomWords = require('random-words');
var WordBank = function(){
	var generateWords = randomWords({ exactly: 1 });
	return generateWords;
}


module.exports = WordBank;