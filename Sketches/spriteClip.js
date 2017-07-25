//divides each sprite in spritesheet into boxes and saves them into JSON
//make a sprite object constructor that has a hitbox object and loads JSON for animations
//you must drag a box over each sprite individually

//Command list:
/*

Keys on keyboard:

s - draws a box around the sprite that is within a box that you selected
enter - saves in JSON


*/

//Clicking a box will remove it

var srcImg = "SpriteSheets/kirby2.png";
var init = false;
var xi=0,xf=0,yi=0,yf=0;
var json = {};

function preload() {
	img = loadImage(srcImg);
}

function setup() {
	img.resize(2*img.width,0); //change scaling value for larger image
	createCanvas(img.width+100,img.height+100);
	img.loadPixels();
	dominantColor = [img.pixels[0],img.pixels[1],img.pixels[2],img.pixels[3]];
	// var dominantColor = findDominantColor(); //change to this if the color is wrong
}

function draw() {
	//if statements for commands
	clear();
	image(img,30,100);
	noFill();
	stroke('black');
	strokeWeight(0.5);
	if (mouseIsPressed) {
		Select();
	} else {
		init = false;
	}
	rect(xi,yi,Math.abs(xf-xi),Math.abs(yf-yi));
}

function Select() {
	if (!init) {
		init = true;
		xi = mouseX;
		yi = mouseY;
	}
	xf = mouseX;
	yf = mouseY;
}

function findDominantColor() {
	//searches for the color with the most instances in img
	//usually you can go with the top left pixel, so this won't usually be necessary
	var colorStrings = [], i, color, totalColors = {};
	var callback = function(element) {
		return element == color.join();
	}
	for (i = 0; i < 4*img.width; i = i + 4) { //change the upper limit on i to search more pixels
		color = [img.pixels[i],img.pixels[i+1],img.pixels[i+2],img.pixels[i+3]];

		if (!colorStrings.some(callback)) {
			colorStrings.push(color.join())
			totalColors[color.join()] = [color];
		} else {
			totalColors[color.join()].push(color);
		}

	}
	var largest = 0, dominantColor;
	for (var key in totalColors) {
		if (totalColors[key].length > largest) {
			dominantColor = totalColors[key][0];
			largest = totalColors[key].length;
		}
	}
	return dominantColor;
}

function analyzeSprite() {
	var w = Math.abs(xf - xi); 
	var h = Math.abs(yf - yi);
	var len = 4*w*h;
	var pxi = xi-30; //upper left corner
	var pyi = yi-100;
	var pxf = xf-30; //bottom right corner
	var pyf = yf-100;
	var subimg = img.get(pxi,pyi,w,h);
	var i, pixel,pixelNum;
	var minX=w,maxX = 0,minY=h,maxY=0;
	var x,y;
	/*Algorithm:
	To Find minY:
	Start from the top and keep scanning by row until you find the first pixel,
	its y value is minY

	To Find maxY:
	Start from the bottom and keep scanning by row until you find the first pixel.
	It's y value is maxY

	To find minX:
	Start from the left and keep scanning by column until you find the first pixel.
	Its x value in minX
	or
	Just scan through the whole thing

	To find maxX:
	Start from the right and keep scanning by column until you find the first pixel.
	Its x value is maxX.
	or
	Just scan through the whole thing

	*/
	
	//finding minY
	for (i = 0; i < len; i = i + 4) {
		pixel = subimg.slice(i,i+4);
		if (pixel != dominantColor.join()) {
			pixelNum = (i/4) + 1;
			//To convert to image coordinates from sub-image coordinates:
			//x = pxi + (pixelNum % w);
			//y = pyi + Math.floor(pixelNum/w);
			minY = pyi + Math.floor(pixelNum/w);
			break;
		}
	}

	//finding maxY
	for (i = len-1; i >= 0; i = i - 4) {
		pixel = subimg.slice(i-3,i+1);
		if (pixel != dominantColor.join()) {
			pixelNum = (i/4) + 1;
			//To convert to image coordinates from sub-image coordinates:
			//x = pxi + (pixelNum % w);
			//y = pyi + Math.floor(pixelNum/w);
			maxY = pyi + Math.floor(pixelNum/w);
			break;
		}
	}
	
	//finding minX
	for (i = 0; i < len; i = i + 4) {
		pixel = subimg.slice(i,i+4);
		if (pixel != dominantColor.join()) {
			x = (pixelNum % w);
			if (x < minX) {
				minX = x;
			}
		}
	}
	minX = minX + pxi;

	//finding maxX
	for (i = 0; i < len; i = i + 4) {
		pixel = subimg.slice(i,i+4);
		if (pixel != dominantColor.join()) {
			x = (pixelNum % w);
			if (x > maxX) {
				maxX = x;
			}
		}
	}
	maxX = maxX + pxi;
	

}