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
var soloSinger = new p5.Speech();
var chorusSingers = new p5.Speech();
var chorusCreated = false;
var text;

// DOM variables
var inputText, speakButton, listButton, singerButton, labels;

// wave drawing variables
var xspacing, w, dx, period;
var singerAmplitude, singerTheta, singerValues;
var chorusAmplitude, chorusTheta, chorusValues;

function setup(){
	// DOM ELEMENTS
	// input dialog
	inputText = createInput("I'm so sexy");
	inputText.style("width", 400);
  inputText.position(20, 65);

	// buttons:
	speakButton = createButton('Sing!');
	speakButton.position(20, 100);
	speakButton.mousePressed(doSpeak);

	listButton = createButton('Computer Responder');
  listButton.position(20, 130);
  listButton.mousePressed(createChorus);

	// labels for instructions
	labels = createDiv("Make me sing!");
	labels.position(20, 40);

	// canvas for visuals
	createCanvas(710, 400);
	colorMode(HSB, 360, 100, 100);
	// text = [];

	// visual initializations
	xspacing = 16;    // Distance between each horizontal location
	period = 200;
	w = width+86;
	dx = (TWO_PI / period) * xspacing;
	singerTheta = 0.02;
	singerValues = new Array(floor(w/xspacing));
	chorusTheta = 0.02;
	chorusValues = new Array(floor(w/xspacing));

	// first words
	soloSinger.setPitch(random(0.2, 0.6));
	soloSinger.setRate(random(1.1, 2.1));
	soloSinger.speak(inputText.value());
}

function draw(){
	background(272, 65, 90);
	calcWave();
	renderWave();
	ellipse(width/2, height/2, 100, 100);
}

function doSpeak(){
	soloSinger.speak(inputText.value()); // debug printer for voice options
	if(chorusCreated){
		let response = Math.floor(random(sexyWords.length));
		chorusSingers.speak(sexyWords[response]);
	}
}
function createChorus(){
	// create the computer chorus singers
	let voiceIndex = Math.floor(random(voiceNames.length));
	let pitchValue = random(1.2,2);
	chorusSingers.listVoices();
	chorusSingers.setVoice(voiceNames[voiceIndex]);
	chorusSingers.setRate(random(1.1, 2.1));
	chorusSingers.setPitch(voiceIndex);
	chorusCreated = true;
}

// function printText(){
// 	for (let j = 0; j < text.length; j++) {
// 		text[j];
// 	}
// }

function calcWave() {
  // initializations
  let theta = 0;
	let x = 0;
	theta += singerTheta;

  // For every x value, calculate a y value with sine function
	x = theta;
  for (let i = 0; i < singerValues.length; i++) {
    singerValues[i] = sin(x)*singerAmplitude;
    x+=dx;
  }

	// variables reset
	theta = 0;
	theta += chorusTheta;
	x = theta;
	for (let i = 0; i < chorusValues.length; i++) {
    chorusValues[i] = sin(x)*chorusAmplitude;
    x-=dx;
  }
}
function renderWave() {
  noStroke();
  // Draw singer wave
	fill(134,100,88);
	for (let i = 0; i < singerValues.length; i++) {
    ellipse(i*xspacing, height/2+singerValues[i], 12, 12);
  }
	// Draw chorus wave
	fill(234,55,100);
	for (let i = 0; i < chorusValues.length; i++) {
		ellipse(i*xspacing, height/2+chorusValues[i], 12, 12);
	}
}
