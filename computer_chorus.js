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
var chorusSingers;
var chorusCreated = false;
var sungText = [];
var textSepatation = 40;

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

	// listButton = createButton('Computer Responder');
  // listButton.position(20, 130);
  // listButton.mousePressed(createChorus);

	// labels for instructions
	labels = createDiv("Make me sing!");
	labels.position(20, 40);

	// canvas for visuals
	createCanvas(710, 400);
	colorMode(HSB, 360, 100, 100);

	// visual initializations
	xspacing = 16;    // Distance between each horizontal location
	period = 200;
	w = width+86;
	dx = (TWO_PI / period) * xspacing;
	singerTheta = 0.02;
	singerAmplitude = 20;
	singerValues = new Array(floor(w/xspacing));
	chorusTheta = 0.02;
	chorusAmplitude = 20;
	chorusValues = new Array(floor(w/xspacing));

	// setup singers and start and end functions
	soloSinger = new p5.Speech();
	soloSinger.setPitch(random(0.2, 0.6));
	soloSinger.setRate(random(1.1, 2.1));
	soloSinger.onStart = exciteSinger;
	soloSinger.onEnd = calmSinger;

	chorusSingers = new p5.Speech();
	chorusSingers.onStart = exciteChorus;
	chorusSingers.onEnd = calmChorus;

	// first words
	sungText.push(inputText.value());
	soloSinger.speak(inputText.value());

}

function draw(){
	background(272, 65, 90);
	calcWave();
	renderWave();
	// ellipse(width/2, height/2, 100, 100);
	printText();
}

function doSpeak(){
	// if there's no chorus, create it
	if(!chorusCreated){
		createChorus();
	}

	// initialize singer visual
	exciteSinger();

	// add text to sing
	sungText.push(inputText.value());
	soloSinger.speak(inputText.value());

	// sing duet if it was created
	if(chorusCreated){
		let response = Math.floor(random(sexyWords.length));
		sungText.push(sexyWords[response]);
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

function printText(){
	fill(255);
	let  k = 0;
	for (let j = sungText.length -1; j >= 0; j--) {
		k++;
		text(sungText[j], 600, textSepatation*k);
	}
}

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
	singerTheta -= 0.01;

	// variables reset
	theta = 0;
	theta += chorusTheta;
	x = theta;
	for (let i = 0; i < chorusValues.length; i++) {
    chorusValues[i] = sin(x)*chorusAmplitude;
    x-=dx;
  }
	chorusTheta += 0.01;

}
function renderWave() {
  noStroke();

  // Draw singer wave
	fill(272+10,50,100);
	for (let i = 0; i < singerValues.length; i++) {
    ellipse(i*xspacing, height*.7 +singerValues[i], 10, 10);
  }

	// Draw chorus wave
	fill(272-10,100,50);
	for (let i = 0; i < chorusValues.length; i++) {
		ellipse(i*xspacing, height*.7 +chorusValues[i], 10, 10);
	}
}

function exciteSinger(){
	singerAmplitude = 70;
	singerTheta = 0.50;
	console.log("excite singer");
}
function calmSinger(){
	singerAmplitude = 20;
	singerTheta = 0.02;
	console.log("calm singer");
}
function exciteChorus(){
	calmSinger();
	chorusAmplitude = 70;
	chorusTheta = 0.50;
	console.log("excite chorus");
}
function calmChorus(){
	chorusAmplitude = 20;
	chorusTheta = 0.02;
	console.log("calm chorus");
}
