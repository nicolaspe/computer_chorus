/* Computer voiced chorus made for the "New Musical Instruments Hackathon"
 * by Katya Rozanova and Nicolas Pena-Escarpentier
 * Oct 14, 2017
 *
 * based on Google's Speech Synthesis API
 * https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API */

// Initilize speech synthizer and get voices
var synth = window.speechSynthesis;
var voices = window.speechSynthesis.getVoices();

// Initialize singers array and create them
var singers = [];
for (let i = 0; i < 4; i++) {
	singers[i] = new SpeechSynthesisUtterance();
}

// create singers and give them a voice! and personality
for (let i = 0; i < 4; i++) {
	// choose the singer's voice
	let voiceIndex = Math.floor( Math.random()*64 );
	singers[i].voice = voices[voiceIndex];
	// give singers personality
	// singers[i].volume = 1;
	// singers[i].rate = 1;
	// singers[i].pitch = 1;
}

// prototype text for singers
for (let i = 0; i < singers.length; i++) {
	singers[i].text = "Hello";
}

// let the singers SING!!!!!
for (let i = 0; i < singers.length; i++) {
	speechSynthesis.speak(singers[i]);
}
