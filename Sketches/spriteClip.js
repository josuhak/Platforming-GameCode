var scale = 2;

function preload() {
	img = loadImage("SpriteSheets/kirby3_edit.png");
}

function setup() {
	createCanvas(windowWidth-100,windowHeight-100);
	inp = createInput('');
	inp.input(myInputEvent); //sets up a function that is called whenever you type something in the box
	slider = createSlider(0,100,2,0.5);
	slider.position(30,30);
	slider.style('width','300px');
}

function draw() {
	scale = slider.value();
	clear();
	drawText();
}

function myInputEvent() {
	console.log('you are typing: ', this.value());
}

function drawText() {
	stroke('black');
	fill('black');
	textSize(11);
	text("Scale: " + scale,30,60);
}