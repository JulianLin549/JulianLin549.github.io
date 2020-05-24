const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const balls = [];
let moves = [];
let mouseDownX = null;
let mouseDownY = null;
let moveCount = 0;
let score = 0;
let timer;
balls.color = undefined;
const orange = document.getElementById("orange");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const grey = document.getElementById("grey");
const purple = document.getElementById("purple");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("overlay");
const scoreSound = document.getElementById("sound");
const moveSound = document.getElementById("moveSound");
const completeSound = document.getElementById("completeSound");
const bgm = document.getElementById("bgm");

const imageList = [orange, red, blue, green, grey, purple];

startBtn.addEventListener("click", function(){
  initialize()
});

function getRandomNum(n) {
  return Math.floor(Math.random() * n);
}

function Ball(x, y) {
  this.x1 = x;
  this.y1 = y;
  this.x2 = x;
  this.y2 = y;
  this.gapCount = 0;

  this.getY = function(){
    //Move ball down gradually
    return (this.y1 + (this.y2-this.y1)*(this.gapCount) / 25) * 60  ;
  }

  this.getX = function(){
    //Move ball sideway gradually
    return (this.x1 + (this.x2-this.x1)*(this.gapCount) / 25) * 60  ;
  }
// the ball is moving. gapCount will gradually reduce from 25 to 0; thus will gradually change getX and getY;
  this.moveBall = function(x2, y2, color) {
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.moving = true;
    this.gapCount = 25;
    moves.push(this);
  };

  this.update = function(){
    this.gapCount--;
    if (this.gapCount <= 0){
      this.moving = false;
    }
  }
}

function initialize() {
  
  overlay.style.display = "none";
  moveCount = 10;
  score = 0;
  //Create Ball Object nested array
  for (let x = 0; x < 10; x++) {
    balls[x] = [];
    for (let y = 0; y < 10; y++) {
      balls[x][y] = new Ball(x, y);
    }
  }
  //Set Color, continue try randomize color until no three continuous color
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      while (true) {
        var colorNum = getRandomNum(6);
        //if there are no 3 continuous color, checkColor == true, break while loop;
        //set random color == curent target color 
        if (checkColor(x, y, colorNum)) {
          balls[x][y].color = colorNum;
          break;
        }
      }
    }
  }
  //set Mouse Event
  canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;
  // start timer
  timer = setInterval(checkBallStatus, 25);
  bgm.volume = 0.4;
  bgm.play();
}

function checkBallStatus() {
  if (moves.length > 0) {

    //Decrement gapCount
    for(let i =0; i < moves.length; i++){
      moves[i].update();
    }

    //If gapCount remains, put it back
    moves = moves.filter(
      function (ball) {
        //debugger;
        return (ball.gapCount !==0); //
      }
    );
    //Moving done
    if (moves.length === 0){
      setRemoveFlag();
      fall();
    }

  
  }
  paint();

  //Gave Over
  if (moves.length ===0 && moveCount === 0){
    clearInterval(timer);
    timer = null;
    //bgm.pause();
    //bgm.currentTime = 0;
    
    setTimeout('gameOver()', 1000);
    audioVolumeOut(bgm);
  }

}

function gameOver(){
  ctx.clearRect(0, 0, 600, 700);
  startBtn.style.display = "inline";
  ctx.font = "bold 20px Helvetica";
  ctx.fillText("Score : " + score, 300, 250);
  completeSound.play();
}

function audioVolumeOut(q){
  if(q.volume){
     var InT = 1;
     var setVolume = 0;  // Target volume level for old song 
     var speed = 0.1;  // Rate of volume decrease
     q.volume = InT;
     var fAudio = setInterval(function(){
         InT -= speed;
         q.volume = InT.toFixed(1);
         if(InT.toFixed(1) <= setVolume){
            clearInterval(fAudio);
            //alert('clearInterval fAudio'+ InT.toFixed(1));
         };
     },100);
  };
};

function setRemoveFlag() {
  //check if vertical has continues three color
  for (let x = 0; x < 10; x++) {
    let c0 = balls[x][0].color;
    let count = 1;
    for (let y = 1; y < 10; y++) {
      let c1 = balls[x][y].color;
      if (c0 === c1) {
        count++;
        //if there are three continuous color balls, remove them
        if (count >= 3) {
          balls[x][y-2].remove = true;
          balls[x][y-1].remove = true;
          balls[x][y].remove = true;
        }
      } else {
        c0 = c1; //reassign c0
        count = 1;
      }
    }
  }
  //check if horizontal has continues three color
  for (let y = 0; y < 10; y++) {
    let c0 = balls[0][y].color;
    let count = 1;
    for (let x = 1; x < 10; x++) {
      let c1 = balls[x][y].color;
      if (c0 === c1) {
        count++;
        //if there are three continuous color balls, remove them
        if (count >= 3) {
          balls[x-2][y].remove = true;
          balls[x-1][y].remove = true;
          balls[x][y].remove = true;
        }
      } else {
        c0 = c1; //reassign c0
        count = 1;
      }
    }
  }
}

function fall() {
  for (let x = 0; x < 10; x++) {
    let z = 9;
    for (let y = 9; y >= 0; y--) {
      while (z >= 0) {
        //check if target is removed, if is removed, z decrease
        if (balls[x][z].remove) {
          z--;
          } else {
          break;
        }
      }
      //The upper balls would drop down and fill the gap
      //While z < 0, use getRandomNum to generate new ball;  
      if (y !== z) {
        let colorNum = (z >= 0) ? balls[x][z].color : getRandomNum(6);
        balls[x][y].moveBall(x, z, colorNum);
      }
      z -= 1;
    }
  }
  //update remove flag & add score & play sound
  let soundFlag = true;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (balls[x][y].remove) {
        balls[x][y].remove = false;
        score += 100;
        //play sound
        if(soundFlag){
          scoreSound.pause();
          scoreSound.currentTime = 0;
          scoreSound.volume = 0.6;
          scoreSound.play();
          soundFlag = false;
        }
      }
    }
  }
}
//compare colors near target, if there are three continuous color, return false, else true 
function checkColor(x, y, c) {
  let flag = true;

  if (x > 1) {
    let c0 = balls[x-2][y].color;
    let c1 = balls[x-1][y].color;

    if (c0 === c1 && c1 === c) {
      flag = false;
    }
  }

  if (y > 1) {
    let c0 = balls[x][y-2].color;
    let c1 = balls[x][y-1].color;

    if (c0 === c1 && c1 === c) {
      flag = false;
    }
  }
  return flag;
}

function paint() {
  //Clear canvas
  ctx.clearRect(0, 0, 600, 700);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      //drawImage(image, x, y, width, height)
      ctx.drawImage(imageList[balls[x][y].color], balls[x][y].getX(), balls[x][y].getY() + 100, 60, 60);
    }
  }

  //Text
  ctx.font = "bold 20px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("Moves Left : " + moveCount, 150, 50);
  ctx.fillText("Score : " + score, 450, 50);
}
//current mouse current location
function myMouseDown(e) {
  mouseDownX = e.offsetX;
  mouseDownY = e.offsetY;
}
//define which ball is selected
function myMouseUp(e) {
  let ballX1 = Math.floor(mouseDownX / 60);
  let ballY1 = Math.floor((mouseDownY - 100) / 60);
  let ballX2 = ballX1;
  let ballY2 = ballY1;
  let mouseUpX = e.offsetX;
  let mouseUpY = e.offsetY;

  //if x difference and y difference == 0, dont move, else if x difference > y difference, move left or right,
  //else y difference > x difference move up or down
  if (
    Math.abs(mouseUpX - mouseDownX) === 0 &&
    Math.abs(mouseUpY - mouseDownY) === 0
  ) {
    return;
  } else if (
    Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY)
  ) {
    ballX2 += mouseUpX - mouseDownX > 0 ? 1 : -1;
  } else {
    ballY2 += mouseUpY - mouseDownY > 0 ? 1 : -1;
  }
  
  //when ball moving or timeout, freeze the movement
  if(balls[ballX1][ballY1].moving || balls[ballX2][ballY2].moving || timer === null){
    return;
  }

  //switch ball color
  let ballColor = balls[ballX1][ballY1].color;
  balls[ballX1][ballY1].moveBall(ballX2, ballY2, balls[ballX2][ballY2].color);
  balls[ballX2][ballY2].moveBall(ballX1, ballY1, ballColor);


  //Decrease move count
  moveCount--;
  paint();
  moveSound.play();
}

