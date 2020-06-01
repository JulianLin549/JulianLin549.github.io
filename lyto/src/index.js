let level = 2;
let numSqures = level * level;
let colors = '';
let colorR = 0;
let colorG = 0;
let colorB = 0;
let score = 0;
let stage = 0;
let timeCount = 0; 
let highestScoreKeeper = 0;

const square = document.querySelector(".square");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");

const overlay = document.getElementById("overlay");
//const menu = document.getElementById("menu");
const container = document.querySelector("#container");
const gameZone = document.querySelector("#gameZone");

const tryAgainBtn = document.getElementById("tryAgainBtn");
const startBtn = document.getElementById("startBtn");

const currentScore = document.getElementById("score");
const scoreNum = document.getElementById("scoreNum");
const finalScore = document.getElementById("finalScore");
const finalScoreNum = document.getElementById("finalScoreNum");
const highestScore = document.getElementById("highestScore");
const highestScoreNum = document.getElementById("highestScoreNum");
const timeLeft = document.getElementById("timeLeft");




window.onload = function() {
    startBtn.style.display = "block";
}

startBtn.addEventListener("click", function(){
    initialize();
    timer = setInterval(checkStatus, 10);
});

tryAgainBtn.addEventListener("click", function(){
    container.innerHTML = '';
    score = 0;
    level = 2;
    stage = 0;
    initialize();
    timer = setInterval(checkStatus, 10);
});

function timeFormat(timeCount){
    let sec = Math.floor(timeCount / 1000);
    let mSec = (timeCount % 1000)/10;

    if(sec <= 0 ){
        sec = '00';
    }else if(sec < 10 ){
      sec = '0' + sec;
    }

    if(mSec < 10){
        mSec = '0'+ mSec;
    }
    
    console.log(sec + ' : ' + mSec);
    return (sec + ' : ' + mSec);
}

function checkStatus(){
    timeCount-=10;
    timeLeft.innerText = timeFormat(timeCount);


    //Gave Over
    if (timeCount <= 0){
        clearInterval(timer);
        timer = null;
        setTimeout('gameOver()', 500);
    }
}
function gameOver(){
    overlay.style.display = "block";
    startBtn.style.display = "none";
    tryAgainBtn.style.display = "block";
    jsImg.style.display = "none";
    finalScoreNum.innerText = score;
    finalScore.style.display = "block";

    if(score > highestScoreKeeper){
      
      highestSoreKeeper = score;
      highestScoreNum.innerText = score;
    }

    highestScore.style.display = "block";
/* 
    completeSound.play();
    bgm.pause();
    bgm.currentTime = 2;  */
}


function initialize(){
    overlay.style.display = "none";
    gameZone.style.display = "block";
    finalScore.style.display = "none";
    highestScore.style.display = "none";
    //15sec
    timeCount = 15 * 1000;
    scoreNum.textContent = score;
    randomColor();
    setupCircle();
    let theOne = document.getElementById("theOne");
    theOne.addEventListener("click", function(){
        score-=1; //because resetState score ++ 2 times.
        resetStage();
    }); 

}


function resetStage(){
    container.innerHTML = '';
    if (stage < (level-1)){
        stage+=1;
    }else {
        level+=1;
        stage = 0;
    }
    score+=1;
    scoreNum.textContent = score;
    setupCircle();
    randomColor();

}

function setupCircle(){
    let row = setRandomNum();
    let col = setRandomNum();
    
    for(let i = 0; i < level; i++){
        var div = document.createElement("div");                 // Create a <div> node
        div.setAttribute("class", "div");
        container.appendChild(div);    


        for(let j =0; j < level; j++){
            var node = document.createElement("div");                 // Create a <div> node
            
            node.style.width = setWidth(level);
            node.style.paddingBottom = setWidth(level);

            node.style.margin = 0.2+'%';

            node.setAttribute("class", "circle");
            node.setAttribute("id", "notTheOne");
            

            div.appendChild(node);      
            //change color
            
            node.style.backgroundColor = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
                     
            
            if(i === row && j === col){
                node.setAttribute("id", "theOne");
                node.classList.add("basicDifficulty");
                
                //enhance Difficult
                if(level > 4) {
                    node.classList.remove("basicDifficulty")
                    node.classList.remove("mediumDifficulty")
                    
                    if (!!setRandomDarker()) {node.classList.add("hardDifficultyDarker");}
                    else {node.classList.add("hardDifficultyBrighter"); }
                    

                }else if (level > 3) {
                    node.classList.remove("basicDifficulty")
                    node.classList.add("mediumDifficulty");
                }   
                
                 node.addEventListener("click", function(){
                    resetStage();

                });
            } 
            else{
                node.addEventListener('mousedown', () => {
                    
                    if(score > 0) {
                        score-=1;
                        scoreNum.textContent = score;
                    }
                    currentScore.classList.add("punishment");
                });
                node.addEventListener('mouseup', () => {
                    currentScore.classList.remove("punishment");
                });

                /* node.addEventListener("click", function(){
            
                
                
                
            }); */
            }
            
                       
        }
        
    }
}



function setRandomNum(){
    let rand = Math.floor(Math.random()*level);
    return rand;
}
function setRandomDarker(){
    let rand = Math.floor(Math.random()*2);
    if (!!rand) return true;
    else return false;
}

function randomColor(){
    colorR = Math.floor(Math.random() * 256);
    colorG = Math.floor(Math.random() * 256);
    colorB = Math.floor(Math.random() * 256);
    if((colorR+colorG+colorB)< 300){
        randomColor();
    }
}

function changeColors(){
    color = randomColor();
}



function setWidth(level){
    let widthNum  = 0;
    
    widthNum  = (100 - 0.4*level)/level;
    
    return widthNum + '%';
}

