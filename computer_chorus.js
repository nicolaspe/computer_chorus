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
var soloSinger;
var chorusSingers = [];

// DOM variables
var inputText, speakButton, listButton, labels;


function setup(){
	soloSinger = new p5.Speech();

	// DOM ELEMENTS
	// input dialog
	inputText = createInput("I'm so sexy");
	inputText.style("width", 400);
  inputText.position(20, 65);

	// buttons:
	speakButton = createButton('Sing!');
	speakButton.position(20, 100);
	speakButton.mousePressed(doSpeak);

	listButton = createButton('Create Computer Chorus');
  listButton.position(20, 140);
  listButton.mousePressed(createChorus);

	// labels for instructions
	labels = createDiv("Make me sing!");
	labels.position(20, 40);

	// canvas for visuals
	createCanvas(800, 800);

	// first words
	soloSinger.speak(inputText.value());
}

function draw(){
	background(0);
}

function doSpeak(){
	soloSinger[0].speak(inputText.value()); // debug printer for voice options
}

function createChorus(){
	// create the computer chorus singers
	for (let i = 0; i < 4; i++) {
		chorusSingers[i] = new p5.Speech();
	}
	chorusSingers[0].listVoices(); // debug printer for voice options
}
