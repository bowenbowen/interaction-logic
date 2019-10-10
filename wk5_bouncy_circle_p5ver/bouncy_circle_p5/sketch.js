let leftValue = 0; // left value
let bottomValue = 0; // bottom value
let rightValue = 0; // right value

// let leftMax = 25000; // close
// let leftMin = 19900; // far
let bottomMax = 160000; // close
let bottomMin = 135000; // far
// let rightMax = 28000; // close
// let rightMin = 21000; // far

let bounceMin = 1; // how bouncy the waves are
let bounceMax = 40;

let stepMin = 20; // the less the steps, the narrower spacings are
let stepMax = 5; // hence the more lines there are


let serial;
let latestData = "waiting for data";

function setup() {

  createCanvas(850, 850);
  noFill();
  strokeWeight(2);
  strokeCap(SQUARE);

  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbserial-14130');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);

  // let options = {baudrate: 115200}; // change the data rate to whatever you wish
  // serial.open(serial, options);


}



function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  // console.log(currentString);
  latestData = currentString;
  bottomValue = latestData;

  // split the string on the commas and convert the resulting substrings
  // into an integer array:
  // values = parseFloat(split(latestData, ","));
  
  
  // if the array has at least three elements, you know you got the whole
  // thing.  Put the numbers in the value variables:
  // if (values.length >= 3) {
  //   leftValue = values[0];
  //   bottomValue = values[1];
  //   rightValue = values[2];
  // }

  console.log(bottomValue);

}




function draw() {
  background(238, 243, 239);
  translate(width / 2, height / 2);
  let radius = 200;
  let step = 10;           // line spacing, influencing the number of lines
  let senReadAdj = 1000;     // make the red more sensitive to proximity
  
  for (let y = -radius + step / 2; y <= radius - step / 2; y += step) {

    let weight = map(bottomValue, bottomMin, bottomMax, 0.1, 8);  // make the line weight changes according to the distance to the bottom plate  
    weight = constrain(weight, 0.1, 8);
    let power = round(map(bottomValue, bottomMin, bottomMax, bounceMin, bounceMax));
    power = constrain(power, bounceMin, bounceMax);
    let wave = abs(pow(sin(y * 0.003 + frameCount * 0.1), power));
    let wy = y - map(wave, 0, 1, -step, step);      // current location of the wave
    let X = sqrt(sq(radius) - sq(y)) /*radius*/ * map(wave, 0, 1, 1, 1.1); // the width of a wave
    let cRate = map(y, -radius + step / 2, radius + step / 2, 0, 1);       // colour gradiation
    // let leftRate = map(leftValue, leftMin, (leftMax-senReadAdj), 0, 1.0); 
    // leftRate = constrain(leftRate, 0, 1.0);
    // let rightRate = map(rightValue, rightMin, (rightMax-senReadAdj), 0, 1.0); 
    // rightRate = constrain(rightRate, 0, 1.0);
    // let leftColor = lerpColor(color(69, 189, 207), color(234, 84, 93), leftRate);   // the colour representing the distance to the left plate
    // let rightColor = lerpColor(color(69, 189, 207), color(234, 84, 93), rightRate); // the colour representing the distance to the right plate
    stroke(lerpColor(color(69, 189, 207), color(234, 84, 93), cRate));
    // blue: color(69, 189, 207)  
    // red: color(234, 84, 93)

    strokeWeight(weight);

    beginShape();
    for (var x = -X; x <= X; x += 1) {
      vertex(x, wy);
    }
    endShape();
  }

  
  
}