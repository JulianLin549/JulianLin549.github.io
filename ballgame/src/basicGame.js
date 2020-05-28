const ctx = canvas.getContext("2d");
const balls = [];
let moves = [];
let mouseDownX = null;
let mouseDownY = null;
let moveCount = 0;
let score = 0;
let timer;
let timeCount;
balls.color = undefined;

const imageList = [orange, red, blue, green, grey, purple];

window.onload = function() {
  basicBtn.style.display = "block";
  timeBtn.style.display = "block";
};

basicBtn.addEventListener("click", function(){
  initialize();
});

timeBtn.addEventListener("click", function(){
  initialize();
});

tryAgainBtn.addEventListener("click", function(){
  initialize();
});


function initialize() {
  
  overlay.style.display = "none";
  moveCount = 3;
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
  bgm.currentTime = 2;
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

    
    setTimeout('gameOver()', 1000);
    audioVolumeOut(bgm);
  
  }

}

function audioVolumeOut(q){
  if(q.volume){
     let InT = 0.4;
     let setVolume = 0;  // Target volume level for old song 
     let speed = 0.05;  // Rate of volume decrease
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

