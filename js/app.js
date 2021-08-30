var sharedData;
var guessedLetters = [];

function generateGame() {
	var url = `https://random-word-api.herokuapp.com/word?number=1&swear=0`;
	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			data = data.toString();
			document.getElementById("word").innerHTML = data.replace(/./g, "_ ");
			sharedData = btoa(data);
			guessedLetters = [];
			replaceword = [];
		})
		.catch(function (err) {
			console.log(err);
			generateGame();
		});

	clearCanvas();
}

function clearCanvas() {
	var canvas = document.getElementById("stickcanvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function buttonPressed(letter) {
	if (guessedLetters.includes(letter)) return;
	var replaceword = [];
	var openSplitData = atob(sharedData).split("");
	var word = document.getElementById("word");
	replaceword = openSplitData.join(" ");
	for (var i = 0; i < openSplitData.length; i++) {
		if (openSplitData[i] != letter) {
			if (guessedLetters.includes(openSplitData[i]) == false) {
				replaceword = replaceword.replace(openSplitData[i], "_ ");
			}
		}
	}
	word.innerHTML = replaceword;
	guessedLetters.push(letter);
}
