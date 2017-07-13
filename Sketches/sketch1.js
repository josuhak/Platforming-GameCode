function setup() {
	createCanvas(windowWidth-100,windowHeight);
}

function draw() {
  //Text telling you x and y position of mouse
  strokeWeight(1);
  fill('black');
  var myText = "mouseX: " + mouseX + " mouseY: " + mouseY;
  clear();
  text(myText,20,20);
  text("Test",textWidth(myText) + 50,20);
  strokeWeight(3);
  fill('red');
  ellipse(mouseX,mouseY,30,30);
}