function setup() {
	platform = new hitRect(0,432,500,100); //hitRect(x,y,w,h)
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
}