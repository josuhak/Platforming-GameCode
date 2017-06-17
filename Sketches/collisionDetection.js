//make a hitRectangle object constructor next, 
//then a pointBox object constructor for seeing if sprites are colliding with things

function hitBox(width, height, thickness, x, y) {
	//thickness tells you how thick the region will be
	//x and y are the initial x and y cooordinates of the upper left corner of the box
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.t = thickness;
	//upper left outer corner
	this.ul_o = [x,y];
	//upper right outer corner
	this.ur_o = [x+width,y];
	//lower left outer corner
	this.ll_o = [x,y+height];
	//lower right outer corner
	this.lr_o = [x+width,y+height];
	//upper left inner corner
	this.ul_i = [x+thickness,y+thickness];
	//upper right inner corner
	this.ur_i = [x+width-thickness,y+thickness];
	//lower left inner corner
	this.ll_i = [x+thickness,y+height-thickness];
	//lower right inner corner
	this.lr_i = [x+width-thickness,y+height-thickness];
	//this function will print all values to console
	this.log = function() {
		var str = "";
		str = str + "X: " + this.x + "\n";
		str = str + "Y: " + this.y + "\n";
		str = str + "Width: " + this.w + "\n";
		str = str + "Height: " + this.h + "\n";
		str = str + "Thickness: " + this.t + "\n";
		str = str + "Upper left outer: " + this.ul_o + "\n";
		str = str + "Upper right outer: " + this.ur_o + "\n";
		str = str + "Lower left outer: " + this.ll_o + "\n";
		str = str + "Lower right outer: " + this.lr_o + "\n";
		str = str + "Upper left inner: " + this.ul_i + "\n";
		str = str + "Upper right inner: " + this.ur_i + "\n";
		str = str + "Lower left inner: " + this.ll_i + "\n";
		str = str + "Lower right inner: " + this.lr_i + "\n";
		console.log(str);
	}
	//this function updates the upper left outer corner
	this.updatePoint = function(newX,newY) {
		this.x = newX;
		this.y = newY;
		this.ul_o = [newX,newY];
		this.ur_o = [newX+this.w,newY];
		this.ll_o = [newX,newY+this.h];
		this.lr_o = [newX+this.w,newY+this.h];
		this.ul_i = [newX+this.t,newY+this.t];
		this.ur_i = [newX+this.w-this.t,newY+this.t];
		this.ll_i = [newX+this.t,newY+this.h-this.t];
		this.lr_i = [newX+this.w-this.t,newY+this.h-this.t];
	}
	//this function updates the dimensions of the box
	this.updateDim = function(newW,newH,newT) {
		//pass in 0's to the parameters you don't want to change
		this.w = newW || this.w;
		this.h = newH || this.h;
		this.t = newT || this.t;
		this.ur_o = [this.x+(newW || this.w),this.y];
		this.ll_o = [this.x,this.y+(newH || this.h)];
		this.lr_o = [this.x+(newW || this.w),this.y+(newH || this.h)];
		this.ul_i = [this.x+(newT || this.t),this.y+(newT || this.t)];
		this.ur_i = [this.x+(newW || this.w)-(newT || this.t),this.y+(newT || this.t)];
		this.ll_i = [this.x+(newT || this.t),this.y+(newH || this.h)-(newT || this.t)];
		this.lr_i = [this.x+(newW || this.w)-(newT || this.t),this.y+(newH || this.h)-(newT || this.t)];
	}
	this.inBox = function(x,y,bool) {
		//returns a boolean array, 1st element being whether it is in the left box, 2nd in the right box
		//3rd in the upper box, 4th in the lower box
		/* looks like this:
		-------------------
		|__|_____3_____|__|
		|  |           |  |
		|1 |           |2 |
		|  |           |  |
		|--|-----------|--|
		|__|_____4_____|__|*/
		//the 5th determines whether it is inside the outer box as a whole, neglecting the inside box
		//the corners overlap, passing for true for both sections
		//1 or true corresponds to inside, 0 or false corresponds to outside
		//pass 1 into bool to see the console log the results
		var result = [];
		var temp = ( (x >= this.ul_o[0]) && (x <= this.ul_i[0]) ) && ( (y >= this.ul_o[1]) && (y <= this.ll_o[1]) );
		result.push(temp);
		temp = ( (x >= this.ur_i[0]) && (x <= this.ur_o[0]) ) && ( (y >= this.ur_o[1]) && (y <= this.lr_o[1]) );
		result.push(temp);
		temp = ( (x >= this.ul_o[0])  && (x <= this.ur_o[0]) ) && ( (y >= this.ul_o[1]) && (y <= this.ul_i[1]) );
		result.push(temp);
		temp = ( (x >= this.ul_o[0])  && (x <= this.ur_o[0]) ) && ( (y >= this.ll_i[1]) && (y <= this.ll_o[1]) );
		result.push(temp);
		temp = ( (x >= this.ul_o[0])  && (x <= this.ur_o[0]) ) && ( (y >= this.ul_o[1]) && (y <= this.ll_o[1]) );
		result.push(temp);
		if (bool) {
			result.forEach(function(value, index) {
				console.log("" + (index + 1) + ": " + value);
			}
			);
		}
		return result;
	}
	this.drawBox = function() {
		fill('red');
		noStroke();
		rect(this.x,this.y,this.w,(this.ul_i[1] - this.ul_o[1]));
		rect(this.x,this.y,(this.ul_i[0] - this.ul_o[0]),this.h);
		rect(this.ll_o[0],this.ll_i[1],this.w,(this.ll_o[1] - this.ll_i[1]));
		rect(this.ur_i[0],this.ur_o[1],this.ur_o[0]-this.ur_i[0],this.h);
	}
}