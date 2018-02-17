var Letter = require("./Letter")

// for all new words 
var Word = function (word) {
	this.newWord = word;
	//console.log(this.newWord);
	this.displayStr = "";
	this.wordArr = this.newWord.split("");

	this.wordLetters = word.split("").filter(function (letter, pos) {
		return word.split("").indexOf(letter) == pos;
	});

	this.letterObjects = [];

	// send current word through letter constructor
	this.createLetterObjs = function(){
		var letterObjects = this.letterObjects;
	 	this.wordArr.forEach(function(letter){
	 		var newLetter = new Letter(letter);
	 		letterObjects.push(newLetter);
	 	})	
	}

 	// show dashes
	this.displayCharacters = function(){

		var displayStr = "";	
		this.letterObjects.forEach(function(letterObject){
			displayStr += letterObject.currentVal + ' ';
		})
		console.log("word: ", displayStr);

	}

	// validate letter guessed
	this.guessedLetter = function(currentLetter, callbackA, callbackB, gameState){
		var wordLetters = this.wordLetters;
		
		// check if letter guessed is in the current word
		if(wordLetters.includes(currentLetter)) {
			console.log("correct!");
			this.letterObjects.forEach(function(letterObject){
				if(!letterObject.isLetter && letterObject.letter === currentLetter){
					letterObject.isLetter = true;
					letterObject.currentVal = currentLetter;
				}
			})

			// get index of letter in current word
		  var index = wordLetters.indexOf(currentLetter);
		  wordLetters.splice(index, 1);
		  var currentWord = this.newWord
		  if(wordLetters.length != 0){
		  	callbackA();
		  } else if (wordLetters.length === 0){
		  	gameState.wins++;
		  	console.log("\n---------------------------------");
		  	console.log("\n", currentWord.toUpperCase(), "was the word. You win!");
		  	console.log("\n---------------------------------")
		  	console.log("\n");
		  	callbackB();
		  } else {
		  	gameState.losses++;
		  	console.log("\n---------------------------------");
		  	console.log("\n ╮(╯▽╰)╭");
		  	console.log("\n", currentWord.toUpperCase(), "was the word. You lose");
		  	console.log("\n---------------------------------")
		  	console.log("\n");
		  	callbackB();
		  }

		} else {
			console.log(" the word does not include:", currentLetter);
			callbackA();
		}
	}
}

// var test = new Word('hi');
// test.createLetterObjs();
// test.displayCharacters();

module.exports = Word;

