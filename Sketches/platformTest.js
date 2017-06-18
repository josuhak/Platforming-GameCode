function setup() {
	platform = new Platform(0,432,500,100); //Platform(x,y,w,h)
	player = new testPlayer(264,164,50);
	createCanvas(windowWidth-100,windowHeight-100);
}

function draw() {
	player.hitTest(platform); //do the computation
	player.collisionTest();
	player.keyPress();
	player.doGravity();
	player.doFriction();
	player.updatePoint();
	clear(); //clear canvas
	platform.drawRect(); //draw the frame
	player.drawPlayer();
	fill('black');
  	stroke('black');
  	strokeWeight(1);
  	textLeading(15);
  	textSize(11);
	text("Click and hold to draw platforms\nLeft and right arrow to move, up arrow to jump",19,20);
	if (mouseIsPressed) {
		platform.createPlatform();
	}
	if (!mouseIsPressed && !platform.pushed) {
		platform.init = false;
		platform.pushed = true;
		platform.addPlatform(platform.xi,platform.yi,Math.abs(platform.xf-platform.xi),Math.abs(platform.yf-platform.yi));
	}
}