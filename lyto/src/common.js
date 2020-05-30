function gameOver(){

    overlay.style.display = "block";
    jsImg.style.display = "none";
    startBtn.style.display = "none";
    timeBtn.style.display = "none";
    tryAgainBtn.style.display = "block";
    
    finalScoreNum.innerText = score;
    finalScore.style.display = "block";

    if(score > highestSoreKeeper){
      
      highestSoreKeeper = score;
      highestScoreNum.innerText = score;
    }

    highestScore.style.display = "block";

    completeSound.play();
    bgm.pause();
    bgm.currentTime = 2;
  }