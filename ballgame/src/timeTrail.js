

function initialize() {
  timeCount = 5 * 1000 //15sec
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
  //decrement time count
  timeCount-=25;

 
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
  if (moves.length ===0 && timeCount <= 0){
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
  //ctx.textAlign = "center";
  //Time 
  let sec = Math.floor(timeCount / 1000);
  let mSec = timeCount % 1000;

  if(sec < 0 ){
      sec = '00';
  }else if(sec < 10 ){
    sec = '00' + sec;
  }

  if(mSec < 0){
      mSec = '00';
  }
  ctx.fillText("Time Left : " + sec + ' : ' + mSec, 150, 50);
  ctx.fillText("Score : " + score, 450, 50);
}
//current mouse current location

