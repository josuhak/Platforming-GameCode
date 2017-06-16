//for games, only set gravity to true when you jump, and false when section 4 is true ONLY.
//There should be no overlapping when you set to false.
//This is to prevent sprites from vibrating.
//Use the overlapping sections as conditions sometimes.

var x = 290;
var y = 140;
var t = 15;
var w = 90;
var h = 85;
var myHitBox = new hitBox(w,h,t,x,y);

function setup() {
  createCanvas(windowWidth-100,windowHeight-100);
}

function draw() {
  hit = myHitBox.inBox(mouseX,mouseY);
  myText = "1: " + (hit[0] ? "true" : "false") + "\n";
  myText = myText + "2: " + (hit[1] ? "true" : "false") + "\n";
  myText = myText + "3: " + (hit[2] ? "true" : "false") + "\n";
  myText = myText + "4: " + (hit[3] ? "true" : "false") + "\n";
  myText = myText + "Inside box: " + (hit[4] ? "true" : "false") + "\n";
  myText = myText + "Width: " + w + "\n";
  myText = myText + "Height: " + h + "\n";
  myText = myText + "Thickness: " + t + "\n";
  fill('black');
  stroke('black');
  strokeWeight(1);
  textLeading(15);
  textSize(11);
  if (keyIsDown(RIGHT_ARROW))
    x+=5;
  if (keyIsDown(LEFT_ARROW))
    x-=5;
  if (keyIsDown(DOWN_ARROW))
    y+=5;
  if (keyIsDown(UP_ARROW))
    y-=5;
  if (key == 'a')
    t-=5;
  if (key == 's')
    t+=5;
  if (key == 'q')
    w+=5;
  if (key == 'w')
    w-=5;
  if (key == 'e')
    h+=5;
  if (key == 'r')
    h-=5;
  myHitBox.updateDim(w,h,t);
  myHitBox.updatePoint(x,y);
  clear();
  text(myText,20,19);
  myHitBox.drawBox();
}

