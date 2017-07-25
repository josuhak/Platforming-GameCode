var myText = "";

function preload() {
	img = loadImage("SpriteSheets/kirby2.png"); //load your image here that you want to analyze the pixels
}

function setup() {
	img.resize(2*img.width,0);
	createCanvas(img.width+500,img.height+500);
}

function draw() {
  strokeWeight(1);
  fill('black');
  pos = "X: " + (mouseX - 50) + " Y: " + (mouseY - 50);
  clear();
  image(img,50,50);
  if (mouseX <= img.width + 50 && mouseX >= 50 && mouseY >= 50 && mouseY <= img.height + 50) {
	  text(pos,20,20);
	  rect(mouseX,mouseY,1,1);
	  if (mouseIsPressed) {
	    col = img.get(mouseX - 50,mouseY -  50);
	  	myText = "R: " + col[0] + " G: " + col[1] + " B: " + col[2] + " A: " + col[3]; 
	  }
  }
  text(myText,100,20);
}