/*

A sketchy and abstract live video filter.

It analyses pixels and may draw a lot of things so may run slowly sometimes.

This sketch needs webcam access.

*/



var canvas;                                                                // canvas element
var video;                                                                 // the capture element
var vidShow;
var vidVisibility = true;
var sldThreshold, sldPixelSz;                                              // slider objects
var minThreshold = 20, maxThreshold = 170, minPxSz = 20, maxPxSz = 100;    // set params for sliders

var pixelSize  = 48; 
// the size of each pixel from the original video when translated onto canvas. 
// i.e. ratio of sizes of canvas to original video

var importantPts = [];                                                     // an array to store points to be connected
var scribble     = new Scribble();                                         // create a scribble object get ready to use scribble library
var rate;                                                                  // to control framerate



function setup() {                                                         // functions that only run once

	canvas = createCanvas(windowHeight*1.4,windowHeight);                  // create the canvas. Keep the ration 1.4:1
	canvas.position(50,0);                                                 // position the sketch on the page

	// create two sliders to control threshold value and pixel size respectively
	sldThreshold = new SliderLayout("Darkness", "dark", "light", minThreshold, maxThreshold, 80, windowWidth*0.8, 100);
	sldPixelSz   = new SliderLayout("Abstraction", "low", "high", minPxSz, maxPxSz, 80, windowWidth*0.8, 250);


	pixelDensity(1);                                                       // turn off automatic display density match

	video = createCapture(VIDEO);                                          // creates a new <video> element that contains the video feed from a webcam
	vidShow = createCapture(VIDEO); //camera / video
	vidShow.size(320, 240);
	vidShow.hide(); //hides video 



button = createButton('Video on/off');
  button.position(19, 19);
  button.mousePressed(function(){vidVisibility = !vidVisibility});
    
}

function draw() {                                                          // functions looping all the time

    
	if ( mouseIsPressed && mouseX<width ){rate=30;}                        // slow down the framerate or the sketch would be dizzy. 
	else{rate = 5;}                                                        // hidden feature: speed up when click on the canvas
	frameRate(rate);

	background(255);                                                       // white bg

	sldThreshold.display();                                                // display the sliders
	sldPixelSz.display();


	video.size(width/pixelSize, height/pixelSize);                         // set the size of the video. Dynamic as it's related to the "resolution" of the sketch
	video.position(0,0);                                                   // set the position of the video
	// video.hide();                                                        // make the video element invisible

if (vidVisibility) {
	push();
	translate(height*1.4, 0);
	scale(-1.0,1.0);    // flip x-axis backwards
	image(vidShow, 0, 0, height*1.4, height); //video on canvas, position, dimensions
	pop();
}
	



	video.loadPixels();                                                    // load the array for the pixel information of the video
	pixelSize = sldPixelSz.slider.value();                                 // link pixelSize with the value returned by the slider




	// hidden feature: when mouse is shaken violently, the sketch will shake
	var ifShaking = dist(mouseX,mouseY,pmouseX,pmouseY);                   // distance between current and previous mouse position
	var shakeAmp  = constrain(ifShaking/5,30,200);                         // how violently the sketch will shake
	var shakeThreshold = 100;                                              // set a threshold for triggering

	if(ifShaking > shakeThreshold){                                        // if mouse is shaking violently enough, shake sketch
	    translate(random(-shakeAmp,shakeAmp),random(-shakeAmp,shakeAmp));
	}



	//start to analyse points
    for (var y = 0; y < video.height-1; y++) {                             // Look through every pixel of the original video.
    	for (var x = 1; x < video.width; x++) {                            // Little tweaks to the nested loop to get rid of annoying borders

    		var index = (video.width - (x + 1) + (y * video.width))*4;
			// An index formula often used to get colour information of a certain pixel from the pixels array. 
			// Little tweak is made with width to flip the image horizontally as the image got from webcam is always mirrored.

    		var r = video.pixels[index+0];                                 // R value of the pixel
    		var g = video.pixels[index+1];                                 // G value of the pixel
    		var b = video.pixels[index+2];                                 // B value of the pixel
    		var bright = (r+g+b)/3;                                        // calculate brightness

    		var threshold = sldThreshold.slider.value();                   // link threshold with the value returned by the slider

			if(bright < (maxThreshold - threshold)){
	      	 importantPts.push(createVector(x*pixelSize,y*pixelSize));     // if a pixel is bright enough, store its coord into the array
	      	}
		}
	}



	// randomly shift the position of points so that they do not look too much like a grid
	for(var i = 0; i < importantPts.length; i++){
		var chaos = pixelSize/3;                                            // the larger the pixelSize the more random
		importantPts[i].x += random(-chaos,chaos);
		importantPts[i].y += random(-chaos,chaos);
	}



	push();
	translate(0,pixelSize/2);                                                // a bit offset adjustment

	for(var i = 0; i < importantPts.length; i++){                            // loop through array twice to check relation between any two points
		for(var j = 0; j < importantPts.length; j++){

			var distance = dist(importantPts[i].x,importantPts[i].y,importantPts[j].x,importantPts[j].y); // distance between any two points

			if( j != i                                                       // check if they are the same point
				&&  distance < pixelSize*2                                   // only adjacent points connect
				&& distance % sqrt(pixelSize*pixelSize) != 0                 // do not draw diagonals and horizontal and vertical lines to make less grid-looking
				&& distance % pixelSize != 0){

				if(random(100)>50){                                          // 50% chance to draw a line
				strokeWeight(random(4));                                     // random stroke weight

				// set the look of scribble lines
				stroke(30);
				scribble.bowing = 3;
				scribble.roughness = 2;
				scribble.maxOffset = 3;

				// connect the points meeting conditions with scribble lines
		   	    scribble.scribbleLine(importantPts[i].x,importantPts[i].y,importantPts[j].x,importantPts[j].y);

			   	}
		   	}
	    }
	}

	pop();



	for(var i = 0; i <30; i++){
		strokeWeight(random(5));                                              // random stroke
		point(random(width),random(height));                                  // add some points to enhance hand drawn effect 
	}


	importantPts.splice(0,importantPts.length);	// empty the array for the next frame. Make sure only information of a single frame is stored
	

	// set the look of scribble lines
	scribble.bowing = 1;
	scribble.roughness = 1;
	scribble.maxOffset = 2;

	// outside frame
    scribble.scribbleRect(width/2,height/2,canvas.width-20,canvas.height-20); 
    
}




// A function used to reate a slider and set its layout
function SliderLayout(label, leftLable, rightLable, minV, maxV, defaultV, posx, posy) {
  
  // properties for lable names 
  this.label;
  this.lftLable;
  this.rtLable;

  this.slider = createSlider(minV, maxV, defaultV);                          // create the slider elements with given value params
  this.slider.position(posx, posy);                                          // set position

  
  this.display = function() {                                                // function to display the slider and lables

    var sliderPos = this.slider.position();                                  // create an var for short
    
 
    this.lftLable = createDiv(leftLable);                                    // set lable on the left and its position
    this.lftLable.position(sliderPos.x - 35, sliderPos.y);
	
    this.rtLable = createDiv(rightLable);                                    // set lable on the right and its position
    this.rtLable.position(sliderPos.x + this.slider.width +10, sliderPos.y);
	
    this.label = createDiv(label);                                           // set lable on the top and its position
    this.label.position(sliderPos.x + 45, sliderPos.y - 20);


  }
}
