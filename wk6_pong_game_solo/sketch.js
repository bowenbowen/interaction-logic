// Take a look at the HTML file where some things have been
// added for mobile viewing

// adapted from Simple Pong processing sketch made by Gabriel Lovato
// https://www.openprocessing.org/sketch/47481


// check if the sketch is being run on a mobile device
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
console.log(window.mobileAndTabletcheck());


  let gameStart = false;

  // ball vars
  let x, y;
  let initialSpeed = 4;
  let speedX = initialSpeed;
  let speedY = initialSpeed;

  // bar vars
  let defaultCol, hitCol;
  let leftColor = 128;
  let rightColor = 128;
  let diam = 20;
  let initialLength = window.innerWidth/3; // define a length relative to the actual height of the canvas
  let rectLength = initialLength;
  let minLength = initialLength / 4;
  let rectThickness = 10;
  let barR, barL;
  let lastBounce = "left";
  let missTolerance = 0;  // tolerance for a miss

  // layout vars
  let margin = window.innerWidth / 12;

  // score vars
  let leftScore = 0;
  let rightScore = 0;
  


function setup() {
  
  createCanvas(windowWidth, windowHeight);
  noStroke();
  smooth();
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // the following variables have to be give values within setup 
  // as I am using some p5 functions that do not work in a global scope
  x = width / 2; // initial position of the ball
  y = height / 2;
  // initialLength = height / 3;  // somehow this doesn't work, so I have to use native js variable innerWidth do define a relative value (see above)
  defaultCol = color(50); // the default colour of the bars
  hitCol = color(150);    // the colour of the bars when they get hit
  
  barL = new Bar(0, height / 2, rectLength, rectThickness, defaultCol);
  barR = new Bar(width - margin, height / 2, rectLength, rectThickness, defaultCol);

}


function draw() {
  background(255);
  
  fill(200);
  textSize(width/3);
  text(leftScore, width * 1 / 4, height / 2);
  text(rightScore, width * 3 / 4, height / 2);
  
  // control different bars when on different sides
  if (mouseX <= width / 2){
    barL.move(margin, mouseY);
  } else {
    barR.move(width - margin, mouseY);
  }
  
  barR.display();
  barL.display();


  //if game has not been started, give the prompt
  textSize(30);
  if (!gameStart) text("Click to start", width / 2, height / 4);


  //draw the ball
  fill(128, 128, 128);
  ellipse(x, y, diam, diam);

  
  
  if (gameStart) {

    // move the ball
    x = x + speedX;
    y = y + speedY;

    // if ball hits the right bar, invert X direction and apply effects
    if (x >= width - margin - rectThickness/2 && 
        y >= barR.y - barR.length/2 - missTolerance && 
        y <= barR.y + barR.length/2 + missTolerance) {
      speedX = speedX * -1;  // invert X speed direction
      x = x + speedX;
      barR.color = hitCol;        // hit effect
      // as you play,the bar gets shorter and shorter
      barR.length -= height / 30;
      barR.length = constrain(barR.length, minLength, initialLength);
      collisionEffect(x + diam / 2, y);
      lastBounce = "right";
    }

    // if ball hits the left bar, change direction of X
    else if (x <= margin + rectThickness/2 && 
        y >= barL.y - barL.length/2 - missTolerance && 
        y <= barL.y + barL.length/2 + missTolerance) {
      speedX = speedX * -1.1;  // invert X speed direction, also increase it a bit
      x = x + speedX;
      barL.color = hitCol;           // hit effect
      barL.length -= height / 30;
      barL.length = constrain(barL.length, minLength , initialLength);
      collisionEffect(x - diam / 2, y);
      lastBounce = "left";
    } 
    
    // if no bar gets hit, display the default color
    else {   
      barL.color = defaultCol;
      barR.color = defaultCol;
    }
    
    // resets things if ball is outside range
    if ( x < margin + rectThickness/2 || x > width - margin - rectThickness/2) {
      console.log("Winner: " + lastBounce);
      if (lastBounce == "left") {
        leftScore += 1;
      } else if (lastBounce == "right") {
      rightScore += 1;
      }
      reset();
    }


    // if ball hits up or down, change direction of Y   
    if (y > height || y < 0) {
      speedY = speedY * -1;  // invert Y speed direction
      y = y + speedY;
    }
    
    console.log(lastBounce);
  }
}



function mousePressed() {
  gameStart = !gameStart;
}


/*---------------------------- functions ----------------------------*/

function reset(){
  gameStart = false;
  x = width / 2;
  y = height / 2;
  barL.length = initialLength;
  barR.length = initialLength;
  speedX = initialSpeed;
}

function touchMoved() { //prevent the window from scrolling around
  return false;
}
function collisionEffect(x, y) {
  fill(200, 50);
  ellipse(x, y, diam * 5, diam * 5);
}


/*---------------------------- bar class ----------------------------*/

class Bar {
  
  constructor(initialX, initialY, length, thickness, color){
    this.x = initialX;
    this.y = initialY;
    this.length = length;
    this.thickness = thickness;
    this.color = color;
  }
  
  move(posX, posY){
    this.x = posX;
    this.y = posY;
  }
  
  display(){
    fill(this.color);
    rect(this.x, this.y, this.thickness, this.length);
  }

}