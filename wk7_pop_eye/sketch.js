// created by Bowen Shen
// 26/10/2019

// made with PoseNet
// https://github.com/tensorflow/tfjs-models/tree/master/posenet

// initially intented to make a eye-popping-out filter, 
// but also accidentally achieved jiggly eye effect

let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let erelX = 0;
let erelY = 0;

let trailNum = 10;  // the number of the eye positions stored
let eyelPos = new Array(trailNum);  // different arrays to store
let eyerPos = new Array(trailNum);  // coordinates of different body parts


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);


  for (let i = 0; i < trailNum; i++) {  // initialise the array that stores positions
    eyelPos[i] = {};  // have to create an object before pushing properties into it
    eyelPos[i].x = 0;
    eyelPos[i].y = 0;
    eyerPos[i] = {};  
    eyerPos[i].x = 0;
    eyerPos[i].y = 0;
  }


}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    // keypoint indexes could be found at 
    // https://github.com/tensorflow/tfjs-models/tree/master/posenet
    let nX = poses[0].pose.keypoints[0].position.x; // nose
    let nY = poses[0].pose.keypoints[0].position.y; // nose
    let elX = poses[0].pose.keypoints[1].position.x; // left eye
    let elY = poses[0].pose.keypoints[1].position.y; // left eye
    let erX = poses[0].pose.keypoints[2].position.x; // right eye
    let erY = poses[0].pose.keypoints[2].position.y; // right eye

    // to smooth the transitions
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, elX, 0.5);
    eyelY = lerp(eyelY, elY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);

  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {

  translate(width, 0);
  scale(-1.0, 1.0); // flip x-axis backwards, as webcam image is mirrored
  image(video, 0, 0);

  // monitor the nose-to-eye distance to tell the face's distance to the camera
  let d = dist(noseX, noseY, eyelX, eyelY);  

  // update the position array
  // when getting a new coordinate, push all the existing data back by 1 index
  for (let i = trailNum - 1; i > 0; i--) {
    eyelPos[i].x = eyelPos[i - 1].x;
    eyelPos[i].y = eyelPos[i - 1].y;
    eyerPos[i].x = eyerPos[i - 1].x;
    eyerPos[i].y = eyerPos[i - 1].y;
  }
  // store the most up-to-date coordinate as the first one
  eyelPos[0].x = eyelX;
  eyelPos[0].y = eyelY;
  eyerPos[0].x = eyerX;
  eyerPos[0].y = eyerY;


  for (let i = 0; i < trailNum - 1; i++) {
    noStroke();
    // draw the white of the eye
    fill(255);
    ellipse(eyelPos[i].x, eyelPos[i].y, d, d);
    ellipse(eyerPos[i].x, eyerPos[i].y, d, d);
    fill(30);
    // draw the eye pupil
    ellipse(eyelPos[i].x, eyelPos[i].y, d * 0.6, d * 0.6);
    ellipse(eyerPos[i].x, eyerPos[i].y, d * 0.6, d * 0.6);
  }
}