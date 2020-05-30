let level = 2;
let numSqures = level * level;
let colors = '';
let colorR = 0;
let colorG = 0;
let colorB = 0;
let score = 0;
let stage = 0;


const square = document.querySelector(".square");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");

const overlay = document.getElementById("overlay");
const menu = document.getElementById("menu");
const container = document.querySelector("#container");
const gameZone = document.querySelector("#gameZone");
const result = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const finalScoreNum = document.getElementById("finalScoreNum");
const highestScore = document.getElementById("highestScore");
const highestScoreNum = document.getElementById("highestScoreNum");

const tryAgainBtn = document.getElementById("tryAgainBtn");
const startBtn = document.getElementById("startBtn");
const scoreNum = document.getElementById("scoreNum");





window.onload = function() {
    startBtn.style.display = "block";
}

startBtn.addEventListener("click", function(){
    initialize()
});



function initialize(){
    overlay.style.display = "none";
    gameZone.style.display = "block";
    randomColor();
    setupCircle();
    let theOne = document.getElementById("theOne");
    theOne.addEventListener("click", function(){
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
    
    for(let i =0; i < level; i++){
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
                    node.classList.add("hardDifficulty");

                }else if (level > 3) {
                    node.classList.remove("basicDifficulty")
                    node.classList.add("mediumDifficulty");
                }   
                
                node.addEventListener("click", function(){
                    resetStage();
                });
            }
            else{node.addEventListener("click", function(){
                alert("not the one");
            });
            }
            
                       
        }
        
    }
}



function setRandomNum(){
    let rand = Math.floor(Math.random()*level);
    return rand;
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


