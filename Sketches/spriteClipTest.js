var scale = 2;

function preload() {
	img = loadImage("SpriteSheets/kirby3_edit.png"); //load your image here that you want to analyze the pixels
}

function setup() {
	createCanvas(windowWidth-100,windowHeight-100);
	img.resize(2*img.width,0);
}

function draw() {

}