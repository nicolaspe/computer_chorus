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

// DOM variables
var inputText, speakButton, listButton, singerButton, labels;

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
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100);

	// first words
	soloSinger.setPitch(random(0.2, 0.6));
	soloSinger.setRate(random(1.1, 2.1));
	soloSinger.speak(inputText.value());
}

function draw(){
	background(272, 65, 90);
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
