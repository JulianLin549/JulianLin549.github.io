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
    //theOne.style.backgroundColor = "red";
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
    /* let theOne = document.getElementById("theOne");
        //theOne.style.backgroundColor = "red";
        theOne.addEventListener("click", function(){
        resetStage();
        }); */
    
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
                node.classList.add("theOneBrightness");

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



/* function setupCircle(){
    for(let i =0; i < numSqures; i++){
        console.log("imerer");

        var node = document.createElement("div");                 // Create a <div> node
        node.style.backgroundColor = colors;
        node.setAttribute("class", "square");
        container.appendChild(node);                       


        /* squares[i].style.backgroundColor = colors;
        if(not the one)
        squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        }); else{
            add another event listener */
 
/* 

function changeColors(color){
    for(let i =0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
}
}
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
function gernerateRandomColors(num){
    var arr = [];
    for (let i = 0; i<num; i++){
        arr.push(randomColor());
    }
    return arr;
}
function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
    colors = gernerateRandomColors(numSqures);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(let i =0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    messageDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
}

 */