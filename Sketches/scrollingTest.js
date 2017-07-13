function setup() {
	createCanvas(windowWidth-100,windowHeight-100);
	Canvas = new scrollCanvas(0,0,windowWidth-100,windowHeight-100); //must be upper case
	platform = new scrollPlatform(0,432,500,100); //Platform(x,y,w,h)
	player = new scrollPlayer(264,164,50,Canvas);
}

function draw() {
	player.hitTest(platform,Canvas); //do the computation
	player.collisionTest();
	player.keyPress();
	player.doGravity();
	player.doFriction();
	player.updatePoint(Canvas);
	clear(); //clear canvas
	platform.drawRect(Canvas); //draw the frame
	player.drawPlayer();
	player.hitBox.drawBox();
	fill('black');
  	stroke('black');
  	strokeWeight(1);
  	textLeading(15);
  	textSize(11);
	text("Click and hold to draw platforms\nLeft and right arrow to move, up arrow to jump\n\nYou can scroll in all directions",19,20);
	noFill();
	strokeWeight(0.5);
	rect(0,0,windowWidth-101,windowHeight-101);
	// line(player.minX,0,player.minX,windowWidth-100);
	// line(player.maxX,0,player.maxX,windowWidth-100);
	if (mouseIsPressed) {
		platform.createPlatform(Canvas);
	}
	if (!mouseIsPressed && !platform.pushed) {
		platform.init = false;
		platform.pushed = true;
		platform.addPlatform(platform.xi,platform.yi,Math.abs(platform.xf-platform.xi),Math.abs(platform.yf-platform.yi));
	}
}