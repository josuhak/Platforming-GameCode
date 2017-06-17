var platform = new hitRect(300,332,400,200);

var x = 264;
var y = 146;
var player = new testPlayer(x,y,40);

function setup() {
  createCanvas(windowWidth-100,windowHeight-100);
}

function draw() {
	hit = collisionTest();
	if (keyIsDown(RIGHT_ARROW) && !hit.d && !hit.e)
    	x+=5;
	if (keyIsDown(LEFT_ARROW) && !hit.a && !hit.H)
    	x-=5;
	if (keyIsDown(DOWN_ARROW)  && !hit.g && !hit.f)
    	y+=5;
	if (keyIsDown(UP_ARROW)  && !hit.b && !hit.c)
    	y-=5;
    player.updatePoint(x,y);
    clear();
    platform.drawRect();
    player.drawPlayer();
}

function collisionTest() {
	return {
		a: platform.inRect(player.hitBox.a),
		b: platform.inRect(player.hitBox.b),
		c: platform.inRect(player.hitBox.c),
		d: platform.inRect(player.hitBox.d),
		e: platform.inRect(player.hitBox.e),
		f: platform.inRect(player.hitBox.f),
		g: platform.inRect(player.hitBox.g),
		H: platform.inRect(player.hitBox.H),
	};
}