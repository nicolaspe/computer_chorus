/* Computer voiced chorus made for the "New Musical Instruments Hackathon"
 * by Katya Rozanova and Nicolas Pena-Escarpentier
 * Oct 14, 2017
 *
 * based on Google's Speech Synthesis API
 * https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
 *
 * and p5.js-speech library
 * http://ability.nyu.edu/p5.js-speech/
 */


// Initialize singers array
var singers = [];

// DOM variables
var inputText, speakButton, labels;


function setup(){
	// create the singers
	for (let i = 0; i < 4; i++) {
		singers[i] = new p5.Speech();
	}

	// DOM ELEMENTS
	// input dialog
	inputText = createInput("I'm so sexy");
	inputText.style("width", 400);
  inputText.position(20, 65);

	// button:
	speakButton = createButton('Sing!');
	speakButton.position(20, 100);
	speakButton.mousePressed(doSpeak);

	// labels for instructions
	labels = createDiv("Make me sing!");
	labels.position(20, 40);

	// canvas for visuals
	createCanvas(800, 800);

	// first words
	singers[0].speak(inputText.value());
}

function draw(){
	background(0);
}

function doSpeak()
	{
		singers[0].speak(inputText.value()); // debug printer for voice options
	}
