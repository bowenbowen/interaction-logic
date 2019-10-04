// online preview: https://editor.p5js.org/bowenxbowen/full/D_l68qBI7

let rowNum = 8;
let colNum = 8;
let boxSize = 70;
let txtSize = 20;
let hoverFill = 30;
let unhoverFill = 200;
let gibberish = "œß‡Œ¡tÅ±r‘t¼k¶rfºr³gÃ©pп ─п╟╨╬╥▐╠я▀暥帤瓧壔偗僥僗僩ГиЇй�الإعلانﾊｸｻ嵂ｽｱ"; // en.wikipedia.org/wiki/Mojibake
let gibberishChars = gibberish.split("");
let revealPara = "轻轻的我走了正如我轻轻的来我轻轻的招手作别西天的云彩那河畔的金柳是夕阳中的新娘波光里的艳影在我的心头荡漾软泥上的青荇油油的在水底招摇在康河的柔波里我甘心做一条水草"
let revealChars = revealPara.split("");
let characters = []; // an array to store all the Character objects

// let activei, activej;
// let easing = 1;



function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  frameRate(15);
  // This name refers to the Google Fonts embedded in index.html
  textFont("Noto Serif SC");
  
  textStyle(NORMAL);

  for (let i = 0; i < colNum; i++) {     // expand horizontally
    for (let j = 0; j < rowNum; j++) {   // expand vertically

      // to make sure the character matrix is always centred on the canvas

      characters.push(new Character(i, j, txtSize));
    }
  }
}


function draw() {
  background(255);
  // a snippet to debug the alignment of text
  // fill(100,50,200);
  // ellipse((width - boxSize * colNum)/2 , (height - boxSize * rowNum)/2 , 5, 5);

  for (let i = 0; i < characters.length; i++) {
    characters[i].display();
    characters[i].hoverDectect(mouseX, mouseY);
  }

}


/*------------------------------ functions ------------------------------*/


/*-------------------------------- class --------------------------------*/
class Character {
  constructor(ix, iy, size) { // pass x and indexes, as well as textsize

    // top left corner cordinates because of alignment setting
    this.x = (width - boxSize * colNum) / 2 /*horitontal margin*/ + boxSize * ix + boxSize/2; // x position
    this.y = (height - boxSize * rowNum) / 2 /*verticle margin*/ + boxSize * iy + boxSize/2; // y position
    
    this.ix = ix;
    this.iy = iy;
    this.index = iy * colNum + ix;
    this.size = size;
    this.speed = 10;
    this.fill = unhoverFill;
    this.style = NORMAL;
    this.ifHovered = false;
    // this.targetFill = 100;
  }

  display() {
    textStyle(this.style);
    fill(this.fill);
    // textAlign(LEFT, TOP);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    
    if (this.ifHovered == false) {  // if not hovered over, display gibberish
      text(random(gibberishChars), this.x, this.y);
    } else {      // if hovered over, display revealed characters
      let currentChar;
      if(this.index < revealChars.length){  
      // in case there are not enough characters to reveal, start over from the beginning
        currentChar = revealChars[this.index];
        // activei = this.
      } else {
        currentChar = revealChars[this.index%revealChars.length];
      }
      text(currentChar, this.x, this.y);
           
    }
  }

  
  hoverDectect(x, y) {
    // the position that is going to be detected in relation to the object 
    // in this case they're going to be mouseX & mouseY

    let xDist = abs(this.x - x); // calculated x distance to this object
    let yDist = abs(this.y - y); // calculated y distance to this object
    
    if (xDist < boxSize / 2 && yDist < boxSize / 2) { // if within the range
      this.fill = hoverFill; // hover state colour
      this.style = BOLD;
      this.ifHovered = true;
      this.size = txtSize * 2;  // when hovered, size becomes ? times
    } else { // if ouside the range
      this.fill = unhoverFill; // unhover state colour
      this.style = NORMAL; 
      this.ifHovered = false;
      this.size = txtSize;
      
      
    }
  }
  
//   easing(currentVal, targetVal){
    
//     if((targetVal - currentVal) >= easing){
//     let diff = targetVal - currentVal;
    
//     currentVal += diff * easing;
// }
//     console.log(currentVal)
//     return currentVal;
      
//   }
}
